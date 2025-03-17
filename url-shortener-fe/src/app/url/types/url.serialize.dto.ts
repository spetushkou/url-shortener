import { EntityBaseSerializeDto } from '../../../common/entity/entity.base.serialize.dto';
import { EntityId } from '../../../common/entity/entity.id';
import { Url } from './url';

export class UrlSerializeDto extends EntityBaseSerializeDto implements Omit<Url, EntityId> {
  originalUrl: string;
  slug: string;
  shortenUrl: string;
  createdAt: Date;
  userId: string | null;
  visits: number;
}
