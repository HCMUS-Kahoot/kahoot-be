import { HeadingDetail } from './../schema/heading.schema';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, } from "class-validator";

export class CreateHeadingDto {
  @IsArray()
  @ApiProperty({required: true, description: 'Heading detail'})
  detail: HeadingDetail[];

  @IsNumber()
  @ApiProperty({description: 'Heading answer'})
  correctAnswer: Number
}