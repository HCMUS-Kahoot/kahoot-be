import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name', type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'workplace', type: String })
  workplace: string;

  @IsString()
  @ApiProperty({ description: 'organization', type: String })
  organization: string;

  @IsString()
  @ApiProperty({ description: 'cover_image_url', type: String })
  cover_image_url: string;

  @ApiProperty({ description: 'players', type: Number })
  players: number;

  @ApiProperty({ description: 'plays', type: Number })
  plays: number;

  @ApiProperty({ description: 'kahoots', type: Number })
  kahoots: number;

  @IsString()
  @ApiProperty({ type: String, description: 'user' })
  user: string;
}
