import { Document, Types } from 'mongoose';

export abstract class MongoEntity extends Document<Types.ObjectId> {}
