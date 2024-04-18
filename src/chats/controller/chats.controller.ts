import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from '../service/chats.service';
import { UsersService } from '../service/users.service';
import { AuthService } from '../service/auth.service';
import {AuthDto} from '../dto/authDto';
import {AddGroup, GroupDto} from '../dto/groupDto';
import { GroupService } from '../service/groupService';

@Controller()
export class ChatsController {
    constructor(
        private chatsService: ChatsService,
        private usersService: UsersService,
        private authService: AuthService,
        private readonly groupService:GroupService
    ){}

    // Add more routes here
    @Post('login')
    async login(
        @Body() authDto: AuthDto

    ) {
        // Add implementation here
       return await this.authService.generateJwtToken(authDto)
          
    }
    @Post('register')
    async register(
        @Body() authDto: AuthDto
    ){
        return await this.authService.register(authDto)
    }
    @Post('createGroup')
    async createGroup(
        @Body() room:GroupDto
    ){
        return await this.groupService.createGroup(room)
    }

    @Post('addGroup')
    async addGroup(
        @Body() group:AddGroup)
    {
        return await this.groupService.addGroup(group.userId,group.groupId)

   }
}
