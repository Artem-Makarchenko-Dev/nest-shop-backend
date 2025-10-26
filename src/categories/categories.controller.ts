import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CategoriesService} from "@/src/categories/categories.service";
import {CreateCategoryDto} from "@/src/categories/dto/create-category.dto";
import {UpdateCategoryDto} from "@/src/categories/dto/update-category.dto";
import {Roles} from "@/src/common/decorators/roles.decorator";
import {USER_ROLES} from "@/src/common/types/roles.types";
import { Public } from '../common/decorators/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(USER_ROLES.MANAGER)
  create(
    @Body() dto: CreateCategoryDto
  ) {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  @Roles(USER_ROLES.MANAGER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto
  ){
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.MANAGER)
  delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoriesService.delete(id);
  }
}
