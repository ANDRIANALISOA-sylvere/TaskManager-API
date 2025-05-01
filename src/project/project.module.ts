import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  providers: [ProjectService, PrismaService, UserService, JwtStrategy],
  controllers: [ProjectController],
})
export class ProjectModule {}
