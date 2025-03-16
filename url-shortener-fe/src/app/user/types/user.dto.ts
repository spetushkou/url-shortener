import { EntityId } from '../../../common/entity/entity.id';
import { User } from './user';

export class UserDto implements Omit<User, EntityId> {
  email: string;
  password: string;
}
