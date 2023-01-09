import { IsArray, IsDataURI, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Presentation } from '../../../modules/presentations/schema/presentations.schema';
import { User } from '../../authentication/users/schema/users.schema';
import { Type } from 'class-transformer';

export class CreatePresentationSessionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User', type: mongoose.Schema.Types.ObjectId })
  userId: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Presentation', type: mongoose.Schema.Types.ObjectId })
  presentation: Presentation;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ description: 'Start time', type: Date })
  startTime: Date

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ description: 'End time', type: Date })
  endTime: Date

  @IsArray()
  @ApiProperty({ description: 'List user join', type: Array, default: false })
  joinUser: User[];

  @IsArray()
  @ApiProperty({ description: 'List chat', type: Array, default: false })
  chats: any[];

  @IsArray()
  @ApiProperty({ description: 'List question', type: Array, default: false })
  questions: any[];
}
