import { Injectable } from '@nestjs/common';
import { AuthPasswordService } from '../auth/password/auth.password.service';
import { UtilMongo } from '../common/util/util.mongo';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findMany(): Promise<User[]> {
    return this.repository.findMany();
  }

  async findOne(id: string): Promise<User | null> {
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
  async update(id: string, updateDto: UserUpdateDto): Promise<User | null> {
    let updateDtoUpdated: UserUpdateDto = {
      ...updateDto,
    };

    const { password } = updateDto;
    if (password) {
      const passwordHashed = await AuthPasswordService.hash(password);

      updateDtoUpdated = {
        ...updateDtoUpdated,
        password: passwordHashed,
      };
    }

    const filterById = UtilMongo.getFilterById(id);

    return this.repository.update(filterById, updateDtoUpdated);
  }

  async delete(id: string): Promise<User | null> {
    const filterById = UtilMongo.getFilterById(id);
    return this.repository.delete(filterById);
  }

  async validateUnique(email: string): Promise<boolean> {
    const entity = await this.findOneByEmail(email);
    return entity ? false : true;
  }
}
