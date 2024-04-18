import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager'; // ! Don't forget this import
import { SocketMessageDto } from '../dto/SocketMessageDto';
import { GroupService } from './groupService';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private chatsService: ChatsService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly groupService: GroupService
    ) {}

    async handleConnection(socket: Socket) {
        console.log('connected');
        console.log(socket.id);
        const user= await this.chatsService.getUserFromSocket(socket)
        console.log(user.rooms);
        if('66213f194f300e5065040bdf' ==user.rooms[0]){
            console.log('1');
            
            socket.join('a')
        }
        
        // socket.join(user.rooms)
        // console.log(user._id);
        
        // const value =await this.cacheManager.set(user._id, socket.id)
        // console.log(value);
        
    }

    @SubscribeMessage('send_message')
    async listenForMessages(@MessageBody() message: SocketMessageDto, @ConnectedSocket() socket: Socket) {

        const user = await this.chatsService.getUserFromSocket(socket)
        const listgrop =await this.groupService.listGroup(user._id);
        console.log('socket room');
        
        console.log(socket.rooms);
        
        const value=  listgrop.includes(message.room)
        if (!value) {
            throw new WsException('Invalid credentials.');
            
        }
        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        socket.to(message.room).emit('receive_message',{
            message,
            user

        })
        // socket.to('').emit('receive_message',{
        // this.server.emit('receive_message', {
        //     message,
        //     user
        // });
    }
    @SubscribeMessage('get_all_messages')
    async getAllMessages(@ConnectedSocket() socket: Socket) {

        await this.chatsService.getUserFromSocket(socket)
        const messages = await this.chatsService.getAllMessages()

        this.server.sockets.emit('receive_message', messages);    
        return messages
   }
   @SubscribeMessage('se')
    async createMessage(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        console.log('messagesdf', message);
        
        //  const user = await this.chatsService.getUserFromSocket(socket)
        //  const newMessage = await this.chatsService.createMessage(message, user._id)
        //  this.server.sockets.emit('receive_message', newMessage)
        //  return newMessage
    }

}
