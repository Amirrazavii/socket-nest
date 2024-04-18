import { Injectable } from "@nestjs/common";
import { Room } from "../schema/room.schema";
import { User } from "../schema/user.schema";
import {Model} from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { GroupDto } from "../dto/groupDto";


@Injectable()
export class GroupService{
    constructor(
        @InjectModel(Room.name) private roomModel: Model<Room>,
        @InjectModel(User.name) private userModel: Model<User>
    ){}

   async createGroup(room:GroupDto):Promise<Room>{
         const createdGroup = new this.roomModel(room);
         return createdGroup.save();
   }
   async addGroup(userId:string,groupId:string){
         const user = await this.userModel.findById(userId)
         await  user.rooms.push(groupId)
         await  user.save()
         const group = await this.roomModel.findById(groupId)
         
         await  group.users.push(userId)
         await  group.save()
         return true
   }
   async listGroup(userId:string){
         const user= await this.userModel.findById(userId).populate('rooms')
         return user.rooms
   }

    
}