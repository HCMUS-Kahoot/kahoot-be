import { MultipleChoiceDetail } from './../schema/multiple-choice.schema';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, } from "class-validator";

export class CreateMultipleChoiceDto {
  @IsArray()
  @ApiProperty({required: true, description: 'Multiple choice detail'})
  detail: MultipleChoiceDetail[];

  @IsNumber()
  @ApiProperty({required: true, description: 'Multiple choice answer'})
  correctAnswer: Number
}