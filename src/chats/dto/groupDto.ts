import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GroupDto{

    @IsString()
    @ApiProperty()
    name:string;


}

export class AddGroup{
    @IsString()
    @ApiProperty()
    userId:string;

    @IsString()
    @ApiProperty()
    groupId:string;
}