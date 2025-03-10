import { MongoBaseSerializer } from '../../common/database/mongo/mongo.base.serializer';
import { Url } from '../url';

export class UrlSerializer extends MongoBaseSerializer implements Url {
  originalUrl: string;
  slug: string;
  createdAt: Date;

  constructor(partial: Partial<UrlSerializer>) {
    super();

    Object.assign(this, partial);
  }
}
