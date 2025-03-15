import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';
import { UtilMongo } from '../../util/util.mongo';

export class MongoBaseSerializeDto {
  @Exclude()
  _id: Types.ObjectId;

  @Expose()
  get id(): string {
    return UtilMongo.parseId(this._id);
  }
}
