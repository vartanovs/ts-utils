import Redis, { RedisOptions } from 'ioredis';

import { RedisMessages } from './constants';

class RedisClient {
  private client?: Redis.Redis;
  private options?: RedisOptions

  constructor(options?: RedisOptions) {
    if (!options?.host || !options?.port) console.warn(RedisMessages.MISSING_CONFIG);
    this.options = options;
  }

  public init() {
    this.client = new Redis(this.options);
    this.client.on('connect', () => console.log(RedisMessages.CONNECT));
    this.client.on('ready', () => console.log(RedisMessages.READY));
    this.client.on('reconnecting', () => console.log(RedisMessages.RECONNECT));

    this.client.on('close', () => console.log(RedisMessages.CLOSE));
    this.client.on('error', (err: Error) => console.error(RedisMessages.ERROR, err));
    
    return this;
  }
}

export default RedisClient;