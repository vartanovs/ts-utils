import Redis, { RedisOptions } from 'ioredis';

import { RedisMessages } from './constants';

class RedisClient {
  private client?: Redis.Redis;
  private options?: RedisOptions

  constructor(options?: RedisOptions) {
    if (!options?.host || !options?.port) console.warn(RedisMessages.MISSING_OPTIONS);
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

  public get(key: string) {
    if (this.client) return this.client.get(key);

    return this.throwMissingClientError('get');
  }

  public increment(key: string, amount: number = 1) {
    if (this.client) {
      return amount === 1 
        ? this.client.incr(key)
        : this.client.incrby(key, amount);
    }

    return this.throwMissingClientError('get');
  }

  public set(key: string, val: string) {
    if (this.client) return this.client.set(key, val);

    return this.throwMissingClientError('get');
  }

  private throwMissingClientError(command: string) {
    const errorMessage = `Cannot perform redis "${command}" - redis client not yet initialized`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}

export default RedisClient;