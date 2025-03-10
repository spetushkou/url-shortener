import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlCreateRepositoryDto } from './dto/url.create.repository.dto';
import { Url as UrlType } from './url';
import { Url } from './url.entity';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(Url.name) private readonly model: Model<Url>) {}

  async findMany(): Promise<Url[]> {
    return this.model.find().lean<Url[]>(true);
  }

  async findOne(params: Partial<UrlType>): Promise<Url | null> {
    return this.model.findOne(params).lean<Url>(true);
  }

  async create(createDto: UrlCreateRepositoryDto): Promise<Url> {
    const entity = new this.model(createDto);
    const entitySaved = await entity.save();
    return entitySaved.toJSON() as Url;
  }
}
