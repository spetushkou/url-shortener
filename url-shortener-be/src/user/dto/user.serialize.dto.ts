import { Exclude } from 'class-transformer';
import { MongoBaseSerialize } from '../../common/database/mongo/mongo.base.serialize';
import { User } from '../user';

export class UserSerialize extends MongoBaseSerialize implements User {
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserSerialize>) {
    super();

    Object.assign(this, partial);
  }
}
