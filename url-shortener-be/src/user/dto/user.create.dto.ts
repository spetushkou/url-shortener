import { IsEmail, IsStrongPassword } from 'class-validator';
import { User } from '../user';

export class UserCreateDto implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
