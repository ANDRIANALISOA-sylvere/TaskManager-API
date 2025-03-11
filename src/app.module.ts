import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule, TaskModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
