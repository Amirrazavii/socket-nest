import { Injectable } from '@nestjs/common';
import {User,UserDocument} from '../schema/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { AuthDto } from '../dto/authDto';
import {GroupService} from './groupService'


export class UsersService{

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly groupService:GroupService
      ) {}
        async create(user: AuthDto): Promise<User> {
            const createdUser = new this.userModel(user);
            return createdUser.save();
        }

        async findAll(): Promise<UserDocument[]> {
            return this.userModel.find().exec();
        }
        async findById(id: string): Promise<UserDocument> {
            return this.userModel.findById(id).exec();
        }
        async findByEmail(email: string): Promise<UserDocument> {
            return this.userModel.findOne({ email }).exec();
        }
        async findOneUser(username: string): Promise<UserDocument> {
            return this.userModel.findOne({ username }).exec();
        }
}