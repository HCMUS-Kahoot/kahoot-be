import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Group name', type: String })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Cover image url', type: String })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({ description: 'Invatation link', type: String })
  invitationLink: string;

  @IsString()
  @ApiProperty({ description: 'Description', type: String })
  description?: string;
}
