import { Entity } from '../../../../common/entity/entity';

export interface User extends Entity {
  email: string;
  password: string;
}
