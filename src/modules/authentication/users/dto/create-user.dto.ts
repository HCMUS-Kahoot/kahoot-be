import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'email', type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', type: String })
  password: string;

  @IsString()
  @ApiProperty({ description: 'refreshToken', type: String })
  refreshToken: string;
}
