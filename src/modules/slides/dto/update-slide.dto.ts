import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
export class UpdateSlidesDto{
    @ApiProperty({
        type: String,
        required: true,
    })
    slideType: String;

    @ApiProperty({
        type: String,
        required: true,
    })
    title: String;

    @ApiProperty({
        type: String,
        required: true,
    })
    presentation: String;

    @IsObject()
    @ApiProperty({ type: Object, description: 'content', required: true })
    content: unknown;

    @ApiProperty({ type: 'array', description: 'correctAnswer' })
    correctAnswer: unknown;
}
