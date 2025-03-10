import { Types } from 'mongoose';

export interface Url {
  _id: Types.ObjectId;
  originalUrl: string;
  slug: string;
  createdAt: Date;
}
