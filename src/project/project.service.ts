import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAllProjectByUser(email: string) {
    const user = await this.userService.getUserByEmail(email);
    return this.prisma.project.findMany({
      where: { userId: user?.id },
      include: {
        User: true,
        tasks: true,
      },
    });
  }

  async getProjectById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        User: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new BadRequestException('project not found');
    }

    return project;
  }

  async isProjectOwner(projectId: number, userId: number): Promise<boolean> {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (project && project.userId === userId) {
      return true;
    }

    return false;
  }
  async createProject(data: ProjectDto, email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        User: true,
      },
    });

    return project;
  }

  async updateTask(id: number, data: ProjectDto) {
    const project = await this.getProjectById(id);

    return this.prisma.project.update({
      where: { id: project.id },
      data: {
        name: data.name,
      },
      include: {
        User: true,
      },
    });
  }
  async deleteProject(id: number) {
    const project = await this.getProjectById(id);
    return this.prisma.project.delete({
      where: { id: Number(project.id) },
      include: {
        User: true,
      },
    });
  }
}
