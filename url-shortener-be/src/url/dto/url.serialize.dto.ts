import { MongoBaseSerializeDto } from '../../common/database/mongo/mongo.base.serialize.dto';
import { Url } from '../url';

export class UrlSerializeDto extends MongoBaseSerializeDto implements Url {
  originalUrl: string;
  slug: string;
  shortenUrl: string;
  createdAt: Date;
  userId: string | null;
  visits: number;

  constructor(partial: Partial<UrlSerializeDto>) {
    super();

    Object.assign(this, partial);
  }
}
