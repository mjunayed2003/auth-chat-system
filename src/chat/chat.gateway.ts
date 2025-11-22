import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { MessageService } from "./message.service";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  private onlineUsers: Map<string, string> = new Map(); // userId => socketId

  handleConnection(client: Socket) {
    console.log("User connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", client.id);
  }

  @SubscribeMessage("registerUser")
  registerUser(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.onlineUsers.set(data.userId, client.id); // Save userId => socketId mapping
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody() data: { senderId: string; receiverId: string; content: string },
  ) {
    // 1. Save message to database
    const msg = await this.messageService.saveMessage(data);

    // 2. Send only to intended receiver if online
    const receiverSocketId = this.onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      const io = (global as any).io as Server; // or use injected server
      io.to(receiverSocketId).emit("receiveMessage", msg);
    }

    return msg;
  }
}
