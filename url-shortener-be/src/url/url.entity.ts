import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument } from '../common/database/mongo/mongo.document';
import { Url as UrlType } from './url';

@Schema({ versionKey: false })
export class Url extends MongoDocument implements UrlType {
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  shortenUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: String, default: null })
  userId: string | null;

  @Prop({ default: 0 })
  visits: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
