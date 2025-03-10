import { Injectable } from '@nestjs/common';
import { AuthPasswordService } from '../auth/password/auth.password.service';
import { UtilMongo } from '../common/util/util.mongo';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findMany(): Promise<User[]> {
    return this.repository.findMany();
  }

  async findOneById(id: string): Promise<User | null> {
    const filterById = UtilMongo.getFilterById(id);
    return this.repository.findOne(filterById);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email });
  }

  async create(createDto: UserCreateDto): Promise<User> {
    const passwordHashed = await AuthPasswordService.hash(createDto.password);

    const createDtoUpdated: UserCreateDto = {
      ...createDto,
      password: passwordHashed,
    };

    return this.repository.create(createDtoUpdated);
  }
  async verifyAuthentication(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const passwordValid = await AuthPasswordService.verify(password, user.password);
    if (!passwordValid) {
      return null;
    }

    return user;
  }
}
