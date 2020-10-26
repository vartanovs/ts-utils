import * as mongodb from 'mongodb';

import MongoClient from '../src/client';
import { MongoMessages } from '../src/constants';

describe('packages/mongo-client/src/client', () => {
  const mockError = new Error('there was an error');
  const mockUrl = 'www.mock.url';
  const item = { mock: 'item' };
  const mongoItem = { _id: 'abc', ...item };
  const item2 = { mock: 'item2' };
  const mongoItem2 = { _id: 'def', ...item2 };

  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let mockMongo: mongodb.MongoClient;
  let mongoClient: MongoClient;
  let mongoCollection: mongodb.Collection;

  const mongoConfig = {
    host: 'mongo',
    password: 'hunter42',
    port: 27017,
    user: 'user',
  };

  const uninitializedMongoClient = new MongoClient(mongoConfig);

  beforeAll(async () => {
    mockMongo = await mongodb.MongoClient.connect(mockUrl);
    mongoCollection = mockMongo.db('mongodb').collection('collection');
    mongoClient = new MongoClient(mongoConfig);
    mongoClient.init('mongodb');
  });

  describe('this.client.on()', () => {
    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockReturnValue();
      consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValue();
    });

    it('should log a message when connected', () => {
      mockMongo.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(MongoMessages.Connect);
    });

    it('should log an error when an error is emitted by the client', () => {
      mockMongo.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.Error, mockError);
    });
  });

  describe('.deleteAll()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.deleteAll('collection')).toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.deleteMany).not.toHaveBeenCalled();
    });

    it('should call the .deleteMany() method on the mongo client and return deleted item count', async () => {
      spyOn(mongoCollection, 'deleteMany').and.returnValue(Promise.resolve({ result: { n: 1 } }));

      await expect(mongoClient.deleteAll('collection')).resolves.toEqual({ n: 1 });
      expect(mongoCollection.deleteMany).toHaveBeenCalledWith({});
    });

    it('should throw an error if the mongo client throws an error', () => {
      spyOn(mongoCollection, 'deleteMany').and.throwError('something went wrong');

      expect(() => mongoClient.deleteAll('collection')).toThrowError();
    });
  });

  describe('.findAll()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.findAll('collection')).toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.find).not.toHaveBeenCalled();
    });

    it('should call the .find() method on the mongo client and return an array of items', async () => {
      spyOn(mongoCollection, 'find').and.returnValue({ toArray: () => Promise.resolve([]) });

      await expect(mongoClient.findAll('collection')).resolves.toEqual([]);
      expect(mongoCollection.find).toHaveBeenCalledWith({});
    });

    it('should throw an error if the mongo client throws an error', () => {
      spyOn(mongoCollection, 'find').and.throwError('something went wrong');

      expect(() => mongoClient.findAll('collection')).toThrowError();
    });
  });

  describe('.insertOne()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.insertOne('collection', item)).toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.insertOne).not.toHaveBeenCalled();
    });

    it('should call the .insertOne() method on the mongo client and return the inserted item', async () => {
      spyOn(mongoCollection, 'insertOne').and.returnValue(Promise.resolve({ ops: [mongoItem] }));

      await expect(mongoClient.insertOne('collection', item)).resolves.toEqual([mongoItem]);
      expect(mongoCollection.insertOne).toHaveBeenCalledWith(item);
    });

    it('should throw an error if the mongo client throws an error', () => {
      spyOn(mongoCollection, 'insertOne').and.throwError('something went wrong');

      expect(() => mongoClient.insertOne('collection', item)).toThrowError();
    });
  });

  describe('.insertMany()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.insertMany('collection', [item, item2])).toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.insertMany).not.toHaveBeenCalled();
    });

    it('should call the .insertMany() method on the mongo client and return the inserted items', async () => {
      spyOn(mongoCollection, 'insertMany').and.returnValue(Promise.resolve({ ops: [mongoItem, mongoItem2] }));

      await expect(mongoClient.insertMany('collection', [item, item2])).resolves.toEqual([mongoItem, mongoItem2]);
      expect(mongoCollection.insertMany).toHaveBeenCalledWith([item, item2]);
    });

    it('should throw an error if the mongo client throws an error', () => {
      spyOn(mongoCollection, 'insertMany').and.throwError('something went wrong');

      expect(() => mongoClient.insertMany('collection', [item, item2])).toThrowError();
    });
  });
});
