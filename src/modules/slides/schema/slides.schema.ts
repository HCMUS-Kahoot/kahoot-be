import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseDocument } from '../../../base/base.schema';
import { Presentation } from '../../presentations/schema/presentations.schema';
enum SlideType {
  MULTIPLE_CHOICE = 'MultipleChoice',
  HEADING = 'Heading',
  PARAGRAPH = 'Paragraph',
}

export type SlidesDocument= Slide & BaseDocument;

@Schema()
export class Slide {
  @Prop({
    type: String,
    enum: SlideType,
  })
  slideType: String;

  @Prop({
    type: String,
  })
  title: String;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Presentation',
  })
  presentation: Presentation;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'slideType',
  })
  content: String;
}

export const SlidesSchema = SchemaFactory.createForClass(Slide);
