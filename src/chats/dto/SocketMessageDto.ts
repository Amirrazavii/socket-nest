import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SocketMessageDto{
    @ApiProperty()
    @IsString() 
    message:string;
    // @ApiProperty()
    // @IsString() 
    // user:string;

     @ApiProperty()
     @IsString()
     room:string;

}