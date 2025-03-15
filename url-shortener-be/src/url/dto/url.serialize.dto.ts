import { MongoBaseSerialize } from '../../common/database/mongo/mongo.base.serialize';
import { Url } from '../url';

export class UrlSerialize extends MongoBaseSerialize implements Url {
  originalUrl: string;
  slug: string;
  createdAt: Date;

  constructor(partial: Partial<UrlSerialize>) {
    super();

    Object.assign(this, partial);
  }
}
