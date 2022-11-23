import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupMembersDocument = GroupMembers & BaseDocument;
@Schema()
export class GroupMembers extends Base {
  @Prop({ required: true })
  groupId: string;

  @Prop({ required: true })
  memberId: string;

  @Prop({ required: true })
  role: string;
}

export const GroupMembersSchema = SchemaFactory.createForClass(GroupMembers);
