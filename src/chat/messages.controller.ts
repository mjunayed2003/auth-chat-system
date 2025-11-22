import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async sendMessage(
    @Req() req,
    @Body() body: { receiverId: string; content: string }
  ) {
    if (!body.receiverId || !body.content) {
      return { error: 'receiverId and content are required' };
    }

    const message = await this.messageService.saveMessage({
      senderId: req.user.id,
      receiverId: body.receiverId,
      content: body.content,
    });

    return message;
  }
}
