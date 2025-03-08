import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
}
