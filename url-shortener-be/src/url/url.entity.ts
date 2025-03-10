import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoEntity } from '../common/database/mongo/mongo.entity';

@Schema({ versionKey: false })
export class Url extends MongoEntity {
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
