import {Injectable} from '@nestjs/common';
import {UpdateCategoryDto} from "@/src/categories/dto/update-category.dto";
import {CreateCategoryDto} from "@/src/categories/dto/create-category.dto";
import {PrismaService} from "@/src/prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getExistingCategory(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return category
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.getExistingCategory(id);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: dto,
    })
  }

  async create(dto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: dto });
  }

  async delete(id: number) {
    await this.getExistingCategory(id)
    return await this.prisma.category.delete({where: {id}})
  }
}
