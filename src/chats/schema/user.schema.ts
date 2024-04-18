import { Schema, SchemaFactory,Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Room } from './room.schema';

export type UserDocument = User & Document;

@Schema()
export class User  {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Room'})
  rooms:string[]
}

export const UserSchema = SchemaFactory.createForClass(User);