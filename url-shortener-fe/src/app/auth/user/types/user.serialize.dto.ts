import { Exclude } from 'class-transformer';
import { MongoBaseSerializer } from '../../common/database/mongo/mongo.base.serializer';
import { User } from '../user';

export class UserSerializer extends MongoBaseSerializer implements User {
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserSerializer>) {
    super();

    Object.assign(this, partial);
  }
}
