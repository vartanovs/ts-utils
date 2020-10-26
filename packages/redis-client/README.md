# Redis Client

This package contains a client to access a redis data store.

## Installation

```shell
_$ npm install @vartanovs/redis-client
```

## Basic Usage

```typescript
import * as RedisClient from '@vartanovs/redis-client';

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
}

const redisClient = new RedisClient(redisOptions);
redisClient.init();

// Insert, find and delete documents from a collection
await redisClient.insertOne('animals', { name: 'anteater' });
await redisClient.insertMany('animals', [{ name: 'bear' }, { name: 'cat' }]);
const savedAnimals = await redisClient.findAll('animals');
await redisClient.deleteAll('animals');
```

## Resources

- [Mongo Commands](https://docs.mongodb.com/manual/reference/command/)
