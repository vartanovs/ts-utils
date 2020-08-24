import Redis, { RedisOptions } from 'ioredis';

import { RedisMessages } from './constants';

class RedisClient {
  private client?: Redis.Redis;
  private readonly options?: RedisOptions;

  constructor(options?: RedisOptions) {
    if (!options?.host || !options?.port) console.warn(RedisMessages.MissingOptions);
    this.options = options;
  }

  public init() {
    this.client = new Redis(this.options);
    this.client.on('connect', () => console.log(RedisMessages.Connect));
    this.client.on('ready', () => console.log(RedisMessages.Ready));
    this.client.on('reconnecting', () => console.log(RedisMessages.Reconnect));

    this.client.on('close', () => console.log(RedisMessages.Close));
    this.client.on('error', (err: Error) => console.error(RedisMessages.Error, err));

    return this;
  }

  public get(key: string) {
    if (this.client) return this.client.get(key);

    return RedisClient.throwMissingClientError('get');
  }

  public increment(key: string, amount = 1) {
    if (this.client) {
      return amount === 1
        ? this.client.incr(key)
        : this.client.incrby(key, amount);
    }

    return RedisClient.throwMissingClientError('get');
  }

  public set(key: string, val: string) {
    if (this.client) return this.client.set(key, val);

    return RedisClient.throwMissingClientError('get');
  }

  private static throwMissingClientError(command: string) {
    const errorMessage = `Cannot perform redis "${command}" - redis client not yet initialized`;
    console.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}

export default RedisClient;
