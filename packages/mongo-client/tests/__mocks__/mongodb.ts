import { EventEmitter } from 'events';

interface MockMongoClient extends EventEmitter {
  db?(dbName: string): {
    collection(): {
      deleteMany: jest.Mock;
      insertMany: jest.Mock;
      insertOne: jest.Mock;
      find: jest.Mock;
    };
  };
}

const deleteMany = jest.fn(() => ({ result: 'mockVal' }));
const insertMany = jest.fn(<T>(items: T[]) => Promise.resolve({ ops: items }));
const insertOne = jest.fn(<T>(item: T) => Promise.resolve({ ops: [item] }));
const find = jest.fn(() => ({ toArray: jest.fn() }));

const mockMongoCollection = {
  deleteMany,
  insertMany,
  insertOne,
  find,
};

const mockMongoDB = {
  collection: jest.fn(() => mockMongoCollection),
};

const mockMongoClient: MockMongoClient = new EventEmitter();
mockMongoClient.db = jest.fn(() => mockMongoDB);

const mongodb = { MongoClient: { connect: () => Promise.resolve(mockMongoClient) } };

export = mongodb;
