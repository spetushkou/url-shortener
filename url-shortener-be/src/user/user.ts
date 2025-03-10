import { MongoEntity } from '../common/database/mongo/mongo.entity';

export interface User extends MongoEntity {
  email: string;
  password: string;
}
