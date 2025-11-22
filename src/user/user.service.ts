import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(user: any) {
    return this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
