import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

function getFilterbyId(id: string): { _id: Types.ObjectId } {
  return { _id: new ObjectId(id) };
}

function getId(id: Types.ObjectId | string): string {
  return typeof id === 'string' ? id : id.toHexString();
}

export const UtilMongo = {
  getFilterbyId,
  getId,
};
