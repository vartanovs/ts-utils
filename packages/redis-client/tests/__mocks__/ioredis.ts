import { EventEmitter } from 'events';

interface MockRedis extends EventEmitter {
  del?(key: string): Promise<string|null>;
  get?(key: string): Promise<string|null>;
  incr?(key: string): Promise<number>;
  incrby?(key: string, amount: number): Promise<string>;
  set?(key: string, val: string): Promise<string>;
}

const mockRedis: MockRedis = new EventEmitter();
mockRedis.del = jest.fn();
mockRedis.get = jest.fn();
mockRedis.incr = jest.fn();
mockRedis.incrby = jest.fn();
mockRedis.set = jest.fn();

const Redis = jest.fn().mockImplementation(() => mockRedis);

export = Redis;
