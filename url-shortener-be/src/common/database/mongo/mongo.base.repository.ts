import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { MongoDocument } from './mongo.document';

export abstract class MongoBaseRepository<Entity extends MongoDocument> {
  constructor(protected readonly model: Model<Entity>) {}

  async findMany(filter: FilterQuery<Entity> = {}): Promise<Entity[]> {
    return this.model.find(filter).lean<Entity[]>(true);
  }

  async findOne(filter: FilterQuery<Entity>): Promise<Entity | null> {
    return this.model.findOne(filter).lean<Entity>(true);
  }

  async create(createDto: Partial<Entity>): Promise<Entity> {
    const entity = new this.model(createDto);
    const entitySaved = await entity.save();
    return entitySaved.toJSON() as Entity;
  }

  async update(filter: FilterQuery<Entity>, updateDto: UpdateQuery<Entity>): Promise<Entity | null> {
    return await this.model.findOneAndUpdate(filter, { $set: updateDto }, { new: true }).lean<Entity>(true);
  }

  async delete(filter: FilterQuery<Entity>): Promise<Entity | null> {
    return this.model.findOneAndDelete(filter).lean<Entity>(true);
  }
}
