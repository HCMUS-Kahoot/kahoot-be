import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
export class CreateSlidesDto{
  @ApiProperty({
    type: String,
    required: true,
  })
  slideType: String;
  
  @ApiProperty({
    type: String,
    required: true,
  })
  presentation: String;

  @IsObject()
  @ApiProperty({ type: Object, description: 'content' })
  content: unknown;

  @ApiProperty({ type: 'array', description: 'correctAnswer' })
  correctAnswer: unknown;
}