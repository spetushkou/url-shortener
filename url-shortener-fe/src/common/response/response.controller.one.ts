import { Entity } from '../entity/entity';

export interface ResponseControllerOne<T extends Entity> {
  data: T;
}
