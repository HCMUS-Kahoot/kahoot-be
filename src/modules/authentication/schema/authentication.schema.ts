import { Base, BaseDocument } from '../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & BaseDocument;
@Schema()
export class Auth extends Base {
  @Prop({ required: true, type: String, description: 'email' })
  email: string;
  @Prop({ required: true, type: String, description: 'password' })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
