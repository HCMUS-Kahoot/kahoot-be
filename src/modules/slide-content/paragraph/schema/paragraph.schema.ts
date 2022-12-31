import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ParagraphDocument = Paragraph & Document;

export class ParagraphDetail {
  @Prop({required: true, type: String})
  headingContent: String;

  @Prop({required: true, type: String})
  paragraphContent: String;
}

@Schema()
export class Paragraph {
  @Prop({ required: true, type: Array })
  detail: ParagraphDetail[];

  @Prop({})
  correctAnswer: [number];
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);