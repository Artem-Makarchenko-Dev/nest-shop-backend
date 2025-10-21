import {Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";
import { ResponseRoleDto } from './dto/response-role.dto';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {RolesGuard} from "../common/guards/roles.guard";
import {Roles} from "../common/decorators/roles.decorator";
import {USER_ROLES} from "../common/types/roles.types";

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(USER_ROLES.ADMIN)
  findAll(): Promise<ResponseRoleDto[]> {
    return this.rolesService.findAll()
  }

  @Get(':id')
  @Roles(USER_ROLES.ADMIN)
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseRoleDto> {
    return this.rolesService.findOne(id)
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  create (
    @Body() dto: CreateRoleDto
  ): Promise<ResponseRoleDto> {
    return this.rolesService.create(dto)
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto
  ): Promise<ResponseRoleDto> {
    return this.rolesService.update(id, dto)
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseRoleDto> {
    return this.rolesService.delete(id)
  }
}
