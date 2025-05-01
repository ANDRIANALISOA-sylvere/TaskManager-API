import { BadRequestException, Injectable } from '@nestjs/common';
import { Priority } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';
import { TaskDto } from './dto/Task.dto';
import { Status } from 'src/enum/Status.enum';
import { UpdateStatusDto } from './dto/UpdateStatusDto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  async getAllTasks(email: string) {
    const user = await this.userService.getUserByEmail(email);
    const tasks = await this.prisma.task.findMany({
      where: {
        Project: {
          userId: user?.id,
        },
      },
      include: { Project: true },
    });

    return tasks;
  }

  async getTaskById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      throw new BadRequestException('task not found');
    }

    return task;
  }
  async createTask(data: TaskDto) {
    const project = await this.projectService.getProjectById(data.projectId);
    if (!project) {
      throw new BadRequestException('project not found');
    }

    if (!Object.values(Priority).includes(data.priority as Priority)) {
      throw new BadRequestException('invalide value of priority');
    }

    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority as Priority,
        deadline: data.deadline,
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

  async updateTask(
    id: number,
    data: { title: string; description: string; priority: string },
  ) {
    if (!Object.values(Priority).includes(data.priority as Priority)) {
      throw new BadRequestException('invalid value of priority');
    }
    const task = await this.getTaskById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority as Priority,
      },
      include: {
        Project: true,
      },
    });
  }

  async updateStatus(id: number, status: Status) {
    const task = await this.getTaskById(id);
    return this.prisma.task.update({
      where: { id: Number(task.id) },
      data: {
        status,
      },
      include: {
        Project: true,
      },
    });
  }

  async delete(id: number) {
    const task = await this.getTaskById(id);
    return this.prisma.task.delete({
      where: { id: Number(task.id) },
      include: {
        Project: true,
      },
    });
  }
}
