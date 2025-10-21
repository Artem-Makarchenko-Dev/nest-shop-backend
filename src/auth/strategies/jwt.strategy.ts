import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as process from "process";
import {JwtPayload} from "../types/jwt.type";
import {UsersService} from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub)
    if (!user || !user.isActive) throw new UnauthorizedException()
    return {
      id: user.id,
      email: user.email,
      roles: user.roles || [],
    };
  }
}