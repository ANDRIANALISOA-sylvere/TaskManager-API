import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TaskService, PrismaService, ProjectService, UserService],
  controllers: [TaskController],
})
export class TaskModule {}
