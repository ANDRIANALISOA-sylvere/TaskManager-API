import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() user: { name: string; email: string; password: string },
  ) {
    const data = await this.authService.register(user);

    const { password, ...newuser } = data;

    return newuser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }
}
