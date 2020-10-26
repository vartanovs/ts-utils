# MongoDB Client

This package contains a client to access a mongoDB data store.

## Installation

```shell
_$ npm install @vartanovs/mongo-client
```

## Basic Usage

```typescript
import * as MongoClient from '@vartanovs/redis-client';

const mongoConfig = {
  host: process.env.MONGO_HOST,
  password: process.env.MONGO_PASSWORD,
  port: Number(process.env.MONGO_PORT),
  user: process.env.MONGO_USER,
}

const mongoClient = new MongoClient(mongoConfig);
mongoClient.init(process.env.MONGO_DB_NAME);

// Set, get and delete a string value using a unique key
await redisClient.set('key', 'value');
const val = await redisClient.get('key');
await redisClient.delete('key');

// Increment a counter
await redisClient.increment('counterKey'); // Increment by 1
await redisClient.increment('counterKey', 5); // Increment by 5
```

## Resources

- [Redis Commands](https://redis.io/commands)
- [IOredis Documentation](https://github.com/luin/ioredis/blob/master/README.md)
