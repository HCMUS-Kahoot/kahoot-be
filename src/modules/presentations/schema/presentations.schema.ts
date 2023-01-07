import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Base, BaseDocument } from '../../../base/base.schema';
import { User } from '../../authentication/users/schema/users.schema';

export type PresentationDocument= Presentation & BaseDocument;

@Schema()
export class Presentation extends Base {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  })
  owner: User

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: String

  @Prop({
    type: Date,
    default: Date.now(),
  })
  createdDate: Date
  
  @Prop({
    type: Date,
    default: Date.now(),
  })
  lastEdit: Date
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  })
  groupId: String
}

export const PresentationSchema = SchemaFactory.createForClass(Presentation);