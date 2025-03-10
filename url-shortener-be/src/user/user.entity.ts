import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoDocument } from '../common/database/mongo/mongo.document';

@Schema({ versionKey: false })
export class User extends MongoDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
