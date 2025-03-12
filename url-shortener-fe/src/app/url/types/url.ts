import { Entity } from '../../../common/entity/entity';

export interface Url extends Entity {
  originalUrl: string;
  slug: string;
  createdAt: Date;
}
