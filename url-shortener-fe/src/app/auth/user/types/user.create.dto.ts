import { User } from './user';

export class UserCreateDto implements Omit<User, '_id'> {
  email: string;
  password: string;
}
