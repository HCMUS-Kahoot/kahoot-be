import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @ApiProperty({ description: 'Group name', type: String })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Admin Id', type: String })
  adminId: string;

  @IsString()
  @ApiProperty({ description: 'Cover image url', type: String })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({ description: 'Invatation link', type: String })
  invitationLink: string;
}
