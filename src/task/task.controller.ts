import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(
    @Body() data: { title: string; description: string; projectId: number },
  ) {
    const task = await this.taskService.createTask(data);

    return task;
  }
}
