import { Entity } from '../../../common/entity/entity';

export interface Superhero extends Entity {
  originalUrl: string;
  slug: string;
  createdAt: Date;
}
