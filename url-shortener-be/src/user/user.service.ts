import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findMany(): Promise<User[]> {
    const result = await this.repository.findMany();
    return result;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email });
  }

  async create(createDto: UserCreateDto): Promise<User> {
    return this.repository.create(createDto);
  }
}
