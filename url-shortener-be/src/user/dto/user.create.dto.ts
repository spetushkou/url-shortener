import { IsEmail, IsStrongPassword } from 'class-validator';
import { User } from '../user';

export class UserCreateDto implements Omit<User, '_id'> {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
