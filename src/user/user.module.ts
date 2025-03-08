import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, PrismaService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
