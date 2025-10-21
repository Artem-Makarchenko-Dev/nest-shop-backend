import {Controller, Post, Param, Delete, Get, ParseIntPipe, HttpCode, UseGuards} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserWithRolesDto } from './dto/user-with-roles.dto';
import {ResponseRoleDto} from "../roles/dto/response-role.dto";
import {Roles} from "../common/decorators/roles.decorator";
import {USER_ROLES} from "../common/types/roles.types";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {RolesGuard} from "../common/guards/roles.guard";

@Controller('user-roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post(':userId/:roleId')
  @Roles(USER_ROLES.ADMIN)
  assignRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<ResponseRoleDto[]> {
    return this.userRolesService.assignRoleToUser(userId, roleId);
  }

  @Delete(':userId/:roleId')
  @HttpCode(200)
  @Roles(USER_ROLES.ADMIN)
  removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<ResponseRoleDto[]> {
    return this.userRolesService.removeRoleFromUser(userId, roleId);
  }

  @Get('user/:userId')
  @Roles(USER_ROLES.ADMIN)
  getRoles(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseRoleDto[]> {
    return this.userRolesService.getRolesForUser(userId);
  }

  @Get('role/:roleId')
  @Roles(USER_ROLES.ADMIN)
  getUsers(
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<UserWithRolesDto[]> {
    return this.userRolesService.getUsersWithRole(roleId);
  }
}