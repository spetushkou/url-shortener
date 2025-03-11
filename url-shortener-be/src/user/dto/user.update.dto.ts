import { IsOptional, IsStrongPassword } from 'class-validator';
import { User } from '../user';

export class UserUpdateDto implements Partial<Pick<User, 'password'>> {
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
