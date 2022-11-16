import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BaseDocument = Base & Document;
@Schema()
export class Base {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const BaseSchema = SchemaFactory.createForClass(Base);
