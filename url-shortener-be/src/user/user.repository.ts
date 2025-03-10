import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async findMany(): Promise<User[]> {
    return this.model.find().lean<User[]>(true);
  }

  async findOne(params: FilterQuery<User>): Promise<User | null> {
    return this.model.findOne(params).lean<User>(true);
  }

  async create(createDto: UserCreateDto): Promise<User> {
    const entity = new this.model(createDto);
    const entitySaved = await entity.save();
    return entitySaved.toJSON() as User;
  }
}
