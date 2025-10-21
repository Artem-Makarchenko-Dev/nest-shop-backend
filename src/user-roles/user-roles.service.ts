import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UsersService} from "../users/users.service";
import {ResponseRoleDto} from "./dto/response-role.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UserRolesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService
  ) {}

  private async ensureUserAndRoleExist (userId: number, roleId: number) {
    const user = await this.usersService.getExistingUserById(userId)
    const role = await this.rolesService.getExistingRole(roleId)
    return { user, role };
  }

  private async findUserRole (userId: number, roleId: number) {
    await this.ensureUserAndRoleExist(userId, roleId)
    return await this.prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId, roleId }
      }
    })
  }

  private async getUserRoleRelation(userId: number): Promise<ResponseRoleDto[]> {
    const roles =  await this.prisma.role.findMany({
      where: { userRole: { some: { userId } } },
      include: { userRole: true },
    });

    return roles.map(({ id, name, description }) => ({ id, name, description }));
  }

  async assignRoleToUser(userId: number, roleId: number) {
    const existingRole = await this.findUserRole(userId, roleId)

    if (existingRole) {
      throw new ConflictException(`User with id ${userId} already has role ${roleId}`)
    }

    await this.prisma.userRole.create({
      data: {userId, roleId}
    })

    return await this.getUserRoleRelation(userId);
  }

  async removeRoleFromUser(userId: number, roleId: number) {
    const existingRole =  await this.findUserRole(userId, roleId)

    if (!existingRole) {
      throw new NotFoundException(`User with id ${userId} does not have role with id ${roleId}`);
    }

    await this.prisma.userRole.delete({
      where: {
        userId_roleId: { userId, roleId }
      }
    })

    return await this.getUserRoleRelation(userId);
  }

  async getRolesForUser(userId: number): Promise<ResponseRoleDto[]> {
    return this.getUserRoleRelation(userId);
  }

  async getUsersWithRole(roleId: number) {
    const users = await this.prisma.user.findMany({
      where: {
        userRoles: {
          some: { roleId }
        }
      },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    })

    return users.map(({ userRoles, ...user }) => ({
      ...user,
      roles: userRoles.map(ur => ur.role),
    }));
  }
}
