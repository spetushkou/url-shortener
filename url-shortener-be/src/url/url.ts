import { MongoEntity } from '../common/database/mongo/mongo.entity';

export interface Url extends MongoEntity {
  originalUrl: string;
  slug: string;
  shortenUrl: string;
  createdAt: Date;
  userId: string | null;
}
