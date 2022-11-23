import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Group Id', type: String })
  groupId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Id', type: String })
  memberId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role', type: String, default: 'member' })
  role: string;
}
