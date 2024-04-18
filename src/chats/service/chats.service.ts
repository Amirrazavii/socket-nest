import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { AuthService } from "./auth.service";
import { WsException } from "@nestjs/websockets";
import {MessageDto} from '../dto/dto'
import { Message } from "../schema/message.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class ChatsService {
    constructor(private authService: AuthService,
        @InjectModel(Message.name) private messageModel: Model<Message>

    ) {}

    async getUserFromSocket(socket: Socket) {
        let auth_token = socket.handshake.headers.authorization;
        // get the token itself without "Bearer"
        auth_token = auth_token.split(' ')[1];

        const user =await  this.authService.getUserFromAuthenticationToken(
            auth_token
        );

        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        return user;
    }
    async createMessage(message: MessageDto, userId: string) {
        const newMessage = new this.messageModel({...message, userId})
        await newMessage.save
       return newMessage
    }
    async getAllMessages() {
       return this.messageModel.find().populate('user')
    }
}
