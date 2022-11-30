import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupDocument = Group & BaseDocument;
@Schema()
export class Group extends Base {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  adminId: string;

  @Prop()
  coverImageUrl: string;

  @Prop()
  invitationLink: string;

  @Prop()
  description?: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
