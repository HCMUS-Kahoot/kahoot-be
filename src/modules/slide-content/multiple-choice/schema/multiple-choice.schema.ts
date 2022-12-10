import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MultipleChoiceDocument = MultipleChoice & Document;

export class MultipleChoiceDetail {
  @Prop({required: true, type: String})
  answerContent: String;

  @Prop({type: String})
  answerImg: String;
}

@Schema()
export class MultipleChoice {
  @Prop({ required: true, type: Array })
  detail: MultipleChoiceDetail[];

  @Prop({ required: true })
  correctAnswer: [number];
}

export const MultipleChoiceSchema = SchemaFactory.createForClass(MultipleChoice);