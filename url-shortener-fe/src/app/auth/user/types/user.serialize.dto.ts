import { EntityBaseSerializeDto } from '../../../../common/entity/entity.base.serialize.dto';
import { User } from './user';

export class UserSerializeDto extends EntityBaseSerializeDto implements Omit<User, '_id' | 'password'> {
  email: string;
}
