import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

  async createTask(data: {
    title: string;
    description: string;
    projectId: number;
  }) {
    const project = await this.projectService.getProjectById(data.projectId);
    if (!project) {
      throw new BadRequestException('project not found');
    }

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        Project: {
          connect: {
            id: data.projectId,
          },
        },
      },
      include: {
        Project: true,
      },
    });
  }
}
