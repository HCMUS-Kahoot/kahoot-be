import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseDocument } from '../../../base/base.schema';
import { Presentation } from '../../presentations/schema/presentations.schema';
enum SlideType {
  MULTIPLE_CHOICE = 'MultipleChoice',
}

export type SlidesDocument= Slide & BaseDocument;

@Schema()
export class Slide {
  @Prop({
    type: String,
    required: true,
    enum: SlideType,
  })
  slideType: String;

  @Prop({
    type: String,
    required: true,
  })
  title: String;
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Presentation',
  })
  presentation: Presentation;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'slideType',
  })
  content: String;
}

export const SlidesSchema = SchemaFactory.createForClass(Slide);