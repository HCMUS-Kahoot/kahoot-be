import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../authentication/users/schema/users.schema';
import { PresentationSessions } from '../../../modules/presentationSessions/schema/presentationSessions.schema';

export type QuestionsDocument = Questions & BaseDocument;
@Schema()
export class Questions extends Base {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PresentationSession' })
  presentationSession: PresentationSessions;

  @Prop({ required: true, type: String })
  questionContent: string

  @Prop({ required: true, type: Number, default: 0 })
  upVote: Number

  @Prop({ required: true, type: Boolean, default: false })
  isAnswered: Boolean
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
