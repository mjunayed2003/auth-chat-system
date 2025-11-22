import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageService } from './message.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MessagesController],
  providers: [ChatGateway, MessageService],
})
export class ChatModule {}
