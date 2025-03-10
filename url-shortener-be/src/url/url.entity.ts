import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument } from '../common/database/mongo/mongo.document';

@Schema({ versionKey: false })
export class Url extends MongoDocument {
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
