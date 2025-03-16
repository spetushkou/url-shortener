import { EntityId } from '../../../common/entity/entity.id';
import { User } from './user';

export class UserCreateDto implements Omit<User, EntityId> {
  email: string;
  password: string;
}
