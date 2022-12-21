import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, } from "class-validator";
import { ParagraphDetail } from '../schema/paragraph.schema';

export class CreateParagraphDto {
  @IsArray()
  @ApiProperty({required: true, description: 'Paragraph detail'})
  detail: ParagraphDetail[];

  @IsNumber()
  @ApiProperty({description: 'Paragraph answer'})
  correctAnswer: Number
}