import { EntityBaseSerializeDto } from '../../../common/entity/entity.base.serialize.dto';
import { Url } from './url';

export class UrlSerializeDto extends EntityBaseSerializeDto implements Omit<Url, '_id'> {
  originalUrl: string;
  slug: string;
  createdAt: Date;
}
