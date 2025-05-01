import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaskDto } from './dto/Task.dto';
import { UpdateStatusDto } from './dto/UpdateStatusDto';
import { Status } from 'src/enum/Status.enum';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@Request() req) {
    const tasks = await this.taskService.getAllTasks(req.user.email);
    return tasks;
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body()
    data: TaskDto,
  ) {
    const task = await this.taskService.createTask(data);

    return task;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/status/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const { status } = updateStatusDto;
    const task = await this.taskService.updateStatus(id, status);
    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { title: string; description: string; priority: string },
  ) {
    const task = await this.taskService.updateTask(id, data);
    return task;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
