import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getExistingUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.getExistingUserById(id)
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email} });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneWithRoles(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.getExistingUserById(id);
    return this.prisma.user.update({
      where: {id},
      data: dto
    })
  }

  create (dto: CreateUserDto) {
    return this.prisma.user.create({
      data: dto
    })
  }

  async delete (id: number) {
    await this.getExistingUserById(id);
    return this.prisma.user.delete({ where: { id } })
  }
}
