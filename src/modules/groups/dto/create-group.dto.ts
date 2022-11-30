import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Group name', type: String })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Description', type: String })
  description?: string;
}
