import { Base, BaseDocument } from '../../../../base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & BaseDocument;
@Schema()
export class User extends Base {
  @Prop({ required: true, type: String, description: 'email' })
  email: string;
  @Prop({ type: String, description: 'firstName' })
  firstName: string;
  @Prop({ type: String, description: 'lastName' })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
