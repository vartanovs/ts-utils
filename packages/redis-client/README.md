# ESLint Configuration - TypeScript

This package contains a client to access a redis data store.

## Installation

```shell
_$ npm install @vartanovs/redis-client
```

## Basic Usage

```typescript
import * as RedisClient from @vartanovs/redis-client;

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
}

const redisClient = new RedisClient(redisOptions);
redisClient.init();

// Set and get a string value using a unique key
await redisClient.set('key', 'value');
const val = await redisClient.get('key');

// Increment a counter
await redisClient.increment('counterKey'); // Increment by 1
await redisClient.increment('counterKey', 5); // Increment by 5
```

## Resources

- [Redis Commands](https://redis.io/commands)
- [IOredis Documentation](https://github.com/luin/ioredis/blob/master/README.md)
