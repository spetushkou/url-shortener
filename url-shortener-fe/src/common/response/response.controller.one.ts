import { EntityId } from '../entity/entity.id';

export interface ResponseControllerOne<T extends { id: EntityId }> {
  data: T;
}
