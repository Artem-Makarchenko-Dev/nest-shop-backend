import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UpdateRoleDto} from "./dto/update-role.dto";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async getExistingRole (id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } })
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`)
    }
    return role
  }

  async findAll() {
    return await this.prisma.role.findMany()
  }

  async findOne(id: number) {
    return await this.getExistingRole(id)
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.getExistingRole(id);
    return await this.prisma.role.update({
      where: { id },
      data: dto,
    });
  }

  async create(dto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({ data: dto });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException(`Role with name "${dto.name}" already exists`);
      }
      throw err;
    }
  }

  async delete(id: number) {
    await this.getExistingRole(id)
    return await this.prisma.role.delete({where: {id}})
  }
}
