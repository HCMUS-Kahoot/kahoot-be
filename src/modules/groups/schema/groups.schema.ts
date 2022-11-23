import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}

export const GroupSchema = SchemaFactory.createForClass(Group);
