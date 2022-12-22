import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { PresentationSessions } from 'src/modules/presentationSessions/schema/presentationSessions.schema';
import { User } from '../../authentication/users/schema/users.schema';

export class UpdateChatDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User', type: mongoose.Schema.Types.ObjectId })
  userId: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Presentation Session', type: mongoose.Schema.Types.ObjectId })
  presentationSession: PresentationSessions

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Question', type: mongoose.Schema.Types.ObjectId })
  chatContent: String
}
