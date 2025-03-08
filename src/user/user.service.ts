import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
