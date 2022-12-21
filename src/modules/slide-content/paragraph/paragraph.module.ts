import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Paragraph, ParagraphSchema } from './schema/paragraph.schema';
import { ParagraphService } from './paragraph.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Paragraph.name, schema: ParagraphSchema },]),
  ],
  providers: [ParagraphService],
  exports: [
    MongooseModule.forFeature([
      {
        name: Paragraph.name,
        schema: ParagraphSchema,
      },
    ]),
    ParagraphService,
  ]
})
export class ParagraphModule {}
