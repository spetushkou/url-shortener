import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlCreateRepoDto } from './dto/url.create.repo.dto';
import { Url } from './entity/url.model';
import { Url as UrlType } from './url';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(Url.name) private readonly model: Model<Url>) {}

  async findMany(): Promise<Url[]> {
    return this.model.find().lean<Url[]>(true);
  }

  async findOne(params: Partial<UrlType>): Promise<Url | null> {
    return this.model.findOne(params).lean<Url>(true);
  }

  async create(createDto: UrlCreateRepoDto): Promise<Url> {
    const entity = new this.model(createDto);
    const entitySaved = await entity.save();
    return entitySaved.toJSON() as Url;
  }
}
