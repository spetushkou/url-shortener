import { Exclude } from 'class-transformer';
import { MongoBaseSerializeDto } from '../../common/database/mongo/mongo.base.serialize.dto';
import { User } from '../user';

export class UserSerializeDto extends MongoBaseSerializeDto implements User {
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserSerializeDto>) {
    super();

    Object.assign(this, partial);
  }
}
