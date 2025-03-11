import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll() {
    const tasks = await this.taskService.getAllTasks();
    return tasks;
  }
  @Post()
  async create(
    @Body()
    data: {
      title: string;
      description: string;
      priority: string;
      projectId: number;
    },
  ) {
    const task = await this.taskService.createTask(data);

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
