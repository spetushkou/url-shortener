import { Document, Types } from 'mongoose';

export interface Url extends Document<Types.ObjectId> {
  originalUrl: string;
  slug: string;
  createdAt: Date;
}
