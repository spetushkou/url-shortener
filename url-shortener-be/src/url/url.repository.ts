import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseRepository } from '../common/database/mongo/mongo.base.repository';
import { Url } from './url.entity';

@Injectable()
export class UrlRepository extends MongoBaseRepository<Url> {
  constructor(@InjectModel(Url.name) model: Model<Url>) {
    super(model);
  }
}
