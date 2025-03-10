import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Url extends Document<Types.ObjectId> {
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
