import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseRepository } from '../common/database/mongo/mongo.base.repository';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends MongoBaseRepository<User> {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model);
  }
}
