import { EntityId } from '../entity/entity.id';

export interface ResponseControllerMany<T extends { id: EntityId }> {
  data: T[];
}
