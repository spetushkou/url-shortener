import { Entity } from '../entity/entity';

export interface ResponseControllerMany<T extends Entity> {
  data: T[];
}
