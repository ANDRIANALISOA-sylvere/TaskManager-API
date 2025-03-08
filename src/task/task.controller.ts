import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
