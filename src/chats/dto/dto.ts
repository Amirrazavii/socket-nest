import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class MessageDto{
    @ApiProperty()
    @IsString()
    message: string;
}