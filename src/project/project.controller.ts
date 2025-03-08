import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getAll() {
    return this.projectService.getAllProject();
  }

  @Post()
  async create(@Body() body: { name: string; userId: number }) {
    const project = await this.projectService.createProject(body);

    return project;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: { name: string }) {
    return this.projectService.updateTask(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
