import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/authentication/users/schema/users.schema';

export type ProfileDocument = Profile & BaseDocument;
@Schema()
export class Profile extends Base {

  @Prop({ required: true })
  name: string;

  @Prop()
  workplace: string;

  @Prop()
  organization: string;

  @Prop()
  cover_image_url: string;

  @Prop()
  players: number;

  @Prop()
  plays: number;

  @Prop()
  kahoots: number;

  @Prop()
  userId: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
