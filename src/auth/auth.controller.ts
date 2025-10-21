import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {AuthService} from "./auth.service";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import type {JwtRequest} from "./types/jwt.type";
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @Public()
  @Post('/refresh-token')
  async refresh(@Body() dto: RefreshTokenDto) {
    const user = await this.authService.verifyRefreshToken(dto.refreshToken);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req: JwtRequest) {
    return this.authService.logout(req.user.id);
  }
}
