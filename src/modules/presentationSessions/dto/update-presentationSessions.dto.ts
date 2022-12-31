import { IsArray, IsDataURI, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Presentation } from '../../../modules/presentations/schema/presentations.schema';
import { User } from '../../authentication/users/schema/users.schema';

export class UpdatePresentationSessionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User', type: mongoose.Schema.Types.ObjectId })
  userId: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Presentation', type: mongoose.Schema.Types.ObjectId })
  presentation: Presentation;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Start time', type: Date})
  startTime: Date

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'End time', type: Date})
  endTime: Date

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({description: 'List user join', type: Array, default: false})
  joinUser: User[];
}