import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @ApiProperty({ description: 'Group Id', type: String })
  groupId: string;

  @IsString()
  @ApiProperty({ description: 'User email', type: String })
  memberEmail: string;

  @IsString()
  @ApiProperty({ description: 'Role', type: String, default: 'member' })
  role: string;
}
