import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
