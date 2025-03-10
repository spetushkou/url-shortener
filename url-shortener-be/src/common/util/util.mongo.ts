import { Types } from 'mongoose';

function getFilterById(id: string): { _id: Types.ObjectId } {
  return { _id: new Types.ObjectId(id) };
}

function parseId(id: Types.ObjectId | string): string {
  return typeof id === 'string' ? id : id.toHexString();
}

export const UtilMongo = {
  getFilterById,
  parseId,
};
