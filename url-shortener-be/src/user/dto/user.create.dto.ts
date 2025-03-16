import { IsEmail, IsStrongPassword } from 'class-validator';
import { User } from '../user';

export class UserCreateDto implements Omit<User, '_id'> {
  @IsEmail(undefined, { message: 'Email must be a valid email address' })
  email: string;

  @IsStrongPassword(undefined, { message: 'Password is not strong enough' })
  password: string;
}
