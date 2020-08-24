import { EventEmitter } from 'events';

interface MockRedis extends EventEmitter {
  get?(key: string): Promise<string|null>;
  incr?(key: string): Promise<number>;
  incrby?(key: string, amount: number): Promise<string>;
  set?(key: string, val: any): Promise<string>;
}

const mockRedis: MockRedis = new EventEmitter();
mockRedis.get = jest.fn();
mockRedis.incr = jest.fn();
mockRedis.incrby = jest.fn();
mockRedis.set = jest.fn();

const Redis = jest.fn().mockImplementation(() => mockRedis);

export = Redis;
