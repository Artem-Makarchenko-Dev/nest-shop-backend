import {Body, Controller, Post, ParseIntPipe, UseGuards, Request} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {AuthService} from "./auth.service";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import type {JwtRequest} from "./types/jwt.type";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

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
