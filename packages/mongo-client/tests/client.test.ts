import * as mongodb from 'mongodb';

import MongoClient from '../src/client';
import { MongoMessages } from '../src/constants';

describe('packages/mongo-client/src/client', () => {
  const mockError = new Error('there was an error');
  const mockUrl = 'www.mock.url';
  const item = { mock: 'item' };
  const item2 = { mock: 'item2' };

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
      consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValue();
    });

    it('should log an error when an error is emitted by the client', () => {
      mockMongo.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.Error, mockError);
    });
  });

  describe('.init()', () => {
    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockReturnValue();
    });

    it('should log a message when connected', async () => {
      await mongoClient.init('mongodb');
      expect(consoleLogSpy).toHaveBeenCalledWith(MongoMessages.Connect);
    });
  });

  describe('.deleteAll()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.deleteAll('collection')).toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.deleteMany).not.toHaveBeenCalled();
    });

    it('should call the .deleteMany() method on the mongo client and return deleted item count', async () => {
      jest.mocked(mongoCollection.deleteMany).mockResolvedValue({ acknowledged: true, deletedCount: 1 });

      await expect(mongoClient.deleteAll('collection')).resolves.toEqual({ acknowledged: true, deletedCount: 1 });
      expect(mongoCollection.deleteMany).toHaveBeenCalledWith({});
    });

    it('should throw an error if the mongo client throws an error', async () => {
      jest.mocked(mongoCollection.deleteMany).mockRejectedValueOnce(new Error('something went wrong'));

      await expect(() => mongoClient.deleteAll('collection')).rejects.toThrow();
    });
  });

  describe('.findAll()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.findAll('collection')).toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.find).not.toHaveBeenCalled();
    });

    it('should call the .find() method on the mongo client and return an array of items', async () => {
      jest.mocked(mongoCollection.find).mockReturnValue({ toArray: () => Promise.resolve([]) } as unknown as mongodb.FindCursor);

      await expect(mongoClient.findAll('collection')).resolves.toEqual([]);
      expect(mongoCollection.find).toHaveBeenCalledWith({});
    });

    it('should throw an error if the mongo client throws an error', async () => {
      jest.mocked(mongoCollection.find)
        .mockReturnValue({ toArray: () => Promise.reject(new Error('something went wrong')) } as mongodb.FindCursor);

      await expect(() => mongoClient.findAll('collection')).rejects.toThrow();
    });
  });

  describe('.insertOne()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.insertOne('collection', item)).toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.insertOne).not.toHaveBeenCalled();
    });

    it('should call the .insertOne() method on the mongo client and return the inserted item', async () => {
      jest.mocked(mongoCollection.insertOne).mockResolvedValue({ acknowledged: true, insertedId: new mongodb.ObjectId('abc') });

      await expect(mongoClient.insertOne('collection', item)).resolves.toEqual({ acknowledged: true, insertedId: { _id: 'abc' } });
      expect(mongoCollection.insertOne).toHaveBeenCalledWith(item);
    });

    it('should throw an error if the mongo client throws an error', async () => {
      jest.mocked(mongoCollection.insertOne).mockRejectedValueOnce(new Error('something went wrong'));

      await expect(() => mongoClient.insertOne('collection', item)).rejects.toThrow();
    });
  });

  describe('.insertMany()', () => {
    it('should throw an error if called with an uninitialized mongo client', () => {
      expect(() => uninitializedMongoClient.insertMany('collection', [item, item2])).toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(MongoMessages.MissingConnection);
      expect(mongoCollection.insertMany).not.toHaveBeenCalled();
    });

    it('should call the .insertMany() method on the mongo client and return the inserted items', async () => {
      jest.mocked(mongoCollection.insertMany)
        .mockResolvedValue({ acknowledged: true, insertedCount: 2, insertedIds: { 1: new mongodb.ObjectId('abc'), 2: new mongodb.ObjectId('def') } });

      await expect(mongoClient.insertMany('collection', [item, item2]))
        .resolves.toEqual({ acknowledged: true, insertedCount: 2, insertedIds: { 1: { _id: 'abc' }, 2: { _id: 'def' } } });
      expect(mongoCollection.insertMany).toHaveBeenCalledWith([item, item2]);
    });

    it('should throw an error if the mongo client throws an error', async () => {
      jest.mocked(mongoCollection.insertMany).mockRejectedValueOnce(new Error('something went wrong'));

      await expect(() => mongoClient.insertMany('collection', [item, item2])).rejects.toThrow();
    });
  });
});
