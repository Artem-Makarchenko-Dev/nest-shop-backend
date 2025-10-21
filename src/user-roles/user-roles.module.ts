import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import {UsersModule} from "../users/users.module";
import {RolesModule} from "../roles/roles.module";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  imports: [UsersModule, RolesModule],
  controllers: [UserRolesController],
  providers: [UserRolesService, PrismaService],
})

export class UserRolesModule {}