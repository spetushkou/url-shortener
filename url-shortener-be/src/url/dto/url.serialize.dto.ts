import { MongoBaseSerialize as MongoBaseSerializeDto } from '../../common/database/mongo/mongo.base.serialize';
import { Url } from '../url';

export class UrlSerializeDto extends MongoBaseSerializeDto implements Url {
  originalUrl: string;
  slug: string;
  createdAt: Date;

  constructor(partial: Partial<UrlSerializeDto>) {
    super();

    Object.assign(this, partial);
  }
}
