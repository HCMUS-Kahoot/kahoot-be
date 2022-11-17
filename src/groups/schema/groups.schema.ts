import { Base, BaseDocument } from './../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupDocument = Group & BaseDocument;
@Schema()
export class Group extends Base {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
