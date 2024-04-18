import { Module } from '@nestjs/common';
import { ChatsController } from './controller/chats.controller';
import { ChatsService } from './service/chats.service';
import { User , UserSchema} from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {MessageSchema,Message} from './schema/message.schema';
import { ChatGateway } from './service/chat.gateway';
import { UsersService } from './service/users.service';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Room, RoomSchema } from './schema/room.schema';
import { GroupService } from './service/groupService';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema},
    {name:Message.name,schema:MessageSchema},
    {name:Room.name,schema:RoomSchema}
  ]),
JwtModule.register({})
],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway,UsersService,AuthService,GroupService]
})
export class ChatsModule {}
