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
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectOwnerGuard } from './guards/projects.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@Request() req) {
    return this.projectService.getAllProjectByUser(req.user.email);
  }

  @UseGuards(JwtAuthGuard, ProjectOwnerGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() body: ProjectDto, @Request() req) {
    const project = await this.projectService.createProject(
      body,
      req.user.email,
    );

    return project;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: ProjectDto) {
    return this.projectService.updateTask(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
