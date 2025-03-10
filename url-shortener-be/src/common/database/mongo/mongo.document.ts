import { Document, Types } from 'mongoose';

export abstract class MongoDocument extends Document<Types.ObjectId> {}
