import { EntityBaseSerializeDto } from '../../../common/entity/entity.base.serialize.dto';
import { EntityId } from '../../../common/entity/entity.id';
import { User } from './user';

export class UserSerializeDto extends EntityBaseSerializeDto implements Omit<User, EntityId | 'password'> {
  email: string;
}
