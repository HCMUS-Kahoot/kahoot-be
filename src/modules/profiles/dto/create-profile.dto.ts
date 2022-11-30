import { ApiProperty } from '@nestjs/swagger';
import { } from 'class-validator';

export class CreateProfileDto {

  @ApiProperty({ description: 'name', type: String })
  name: string;

  @ApiProperty({ description: 'workplace', type: String })
  workplace: string;


  @ApiProperty({ description: 'organization', type: String })
  organization: string;


  @ApiProperty({ description: 'cover_image_url', type: String })
  cover_image_url: string;

  @ApiProperty({ description: 'players', type: Number })
  players: number;

  @ApiProperty({ description: 'plays', type: Number })
  plays: number;

  @ApiProperty({ description: 'kahoots', type: Number })
  kahoots: number;


  @ApiProperty({ type: String, description: 'user' })
  user: string;
}
