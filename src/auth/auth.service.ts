import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IntegerType } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new UnauthorizedException('user already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async validateUser(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && (await bcrypt.compare(data.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
