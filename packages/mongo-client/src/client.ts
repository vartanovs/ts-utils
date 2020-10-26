import * as mongodb from 'mongodb';

import { MongoMessages } from './constants';
import type { MongoConfig } from './types';

class MongoClient {
  private client: mongodb.MongoClient | undefined;
  private db: mongodb.Db | undefined;
  private readonly uri: string;

  constructor(config: MongoConfig) {
    const { host, password, port, user } = config;
    if (!password || !user) MongoClient.logAndThrow(MongoMessages.MissingCredentials);
    if (!host || !port) MongoClient.logAndThrow(MongoMessages.MissingOptions);
    this.uri = `mongodb://${user}:${password}@${host}:${port}`;
  }

  private static logAndThrow(message: string) {
    console.error(message);
    throw new Error(message);
  }

  public async init(dbName: string) {
    // Create new MongoDB client and data store connection
    this.client = await mongodb.MongoClient.connect(this.uri);
    this.db = this.client.db(dbName);

    this.client.on('connect', () => console.log(MongoMessages.Connect));
    this.client.on('error', (err: Error) => console.error(MongoMessages.Error, err));

    return this;
  }

  public deleteAll(collectionName: string) {
    if (!this.db) return MongoClient.logAndThrow(MongoMessages.MissingConnection);

    return this.db.collection(collectionName).deleteMany({})
      .then((deletedItems) => deletedItems.result);
  }

  public findAll(collectionName: string) {
    if (!this.db) return MongoClient.logAndThrow(MongoMessages.MissingConnection);

    return this.db.collection(collectionName).find({}).toArray();
  }

  public insertOne<T>(collectionName: string, item: T) {
    if (!this.db) return MongoClient.logAndThrow(MongoMessages.MissingConnection);

    return this.db.collection(collectionName).insertOne(item)
      .then((insertedItem) => insertedItem.ops);
  }

  public insertMany<T>(collectionName: string, items: T[])  {
    if (!this.db) return MongoClient.logAndThrow(MongoMessages.MissingConnection);

    return this.db.collection(collectionName).insertMany(items)
      .then((insertedItem) => insertedItem.ops);
  }
}

export default MongoClient;
