import { Document, Types } from 'mongoose';

export interface User extends Document<Types.ObjectId> {
  // _id: Types.ObjectId;
  email: string;
  password: string;
}
