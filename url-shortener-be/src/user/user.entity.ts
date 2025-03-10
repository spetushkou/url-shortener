import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoEntity } from '../common/database/mongo/mongo.entity';

@Schema({ versionKey: false })
export class User extends MongoEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
