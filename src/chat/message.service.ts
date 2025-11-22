import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(data: { senderId: string; receiverId: string; content: string }) {
    return this.prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
      },
    });
  }
}
