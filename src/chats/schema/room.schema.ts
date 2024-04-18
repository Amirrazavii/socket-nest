import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Message } from './message.schema';

export type RoomDocument =Room & Document;


@Schema({
    timestamps: true,
})
export class Room {
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
    users: string[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Message' })
    message:string[];

    @Prop()
    name: string;


    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const RoomSchema = SchemaFactory.createForClass(Room);

