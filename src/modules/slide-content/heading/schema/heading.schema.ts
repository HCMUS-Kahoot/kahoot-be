import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HeadingDocument = Heading & Document;

export class HeadingDetail {
  @Prop({required: true, type: String})
  headingContent: String;

  @Prop({required: true, type: String})
  subHeadingContent: String;
}

@Schema()
export class Heading {
  @Prop({ required: true, type: Array })
  detail: HeadingDetail[];

  @Prop({})
  correctAnswer: [number];
}

export const HeadingSchema = SchemaFactory.createForClass(Heading);