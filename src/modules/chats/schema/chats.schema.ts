import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../authentication/users/schema/users.schema';
import { PresentationSessions } from 'src/modules/presentationSessions/schema/presentationSessions.schema';

export type ChatsDocument = Chats & BaseDocument;
@Schema()
export class Chats extends Base {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PresentationSession' })
  presentationSession: PresentationSessions;

  @Prop({ required: true, type: String })
  chatContent: string
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);
