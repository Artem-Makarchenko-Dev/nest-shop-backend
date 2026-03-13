import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import {UsersModule} from "../users/users.module";
import {RolesModule} from "../roles/roles.module";
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UsersModule, RolesModule, PrismaModule],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})

export class UserRolesModule {}
