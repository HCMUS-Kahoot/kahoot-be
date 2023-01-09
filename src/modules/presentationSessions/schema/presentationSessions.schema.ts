import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../authentication/users/schema/users.schema';
import { Presentation } from '../../presentations/schema/presentations.schema';

export type PresentationSessionsDocument = PresentationSessions & BaseDocument;
@Schema()
export class PresentationSessions extends Base {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' })
  presentation: Presentation;

  @Prop({ required: true, type: Date })
  startTime: Date

  @Prop({ required: true, type: Date })
  endTime: Date

  @Prop({ required: true, type: Array, ref: 'User' })
  joinUser: User[]

  @Prop({ type: Array })
  chats: any[]

  @Prop({ type: Array })
  questions: any[]
}

export const PresentationSessionsSchema = SchemaFactory.createForClass(PresentationSessions);
