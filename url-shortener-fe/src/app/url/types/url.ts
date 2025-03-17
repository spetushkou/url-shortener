import { Entity } from '../../../common/entity/entity';

export interface Url extends Entity {
  originalUrl: string;
  slug: string;
  shortenUrl: string;
  createdAt: Date;
  userId: string | null;
  visits: number;
}
