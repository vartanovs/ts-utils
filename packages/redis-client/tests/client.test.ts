import Redis from 'ioredis';

import RedisClient from '../src/client';
import { RedisMessages } from '../src/constants';

describe('server/lib/redisClient', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let redisClient: RedisClient;
  let uninitializedRedisClient: RedisClient;

  const mockCount = 2;
  const mockIncrementValue = 5;
  const mockOptions = { host: 'localhost', port: 1234 };
  const mockKey = 'key';
  const mockValue = 'value';

  const mockError = new Error('mock error');
  const mockRedis = new Redis();

  beforeAll(() => {
    redisClient = new RedisClient(mockOptions);
    uninitializedRedisClient = new RedisClient(mockOptions);
    redisClient.init();

    consoleLogSpy = jest.spyOn(console, 'log').mockReturnValue();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockReturnValue();
    consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValue();
  });

  describe('new RedisClient.init()', () => {
    it('should pass redis options thru to ioredis.Redis', () => {
      new RedisClient(mockOptions).init();
      expect(Redis).toHaveBeenCalledWith(mockOptions);
    });

    it('should log a warning if host or port are missing from options', () => {
      new RedisClient().init();
      expect(Redis).toHaveBeenCalledWith(undefined);
      expect(consoleWarnSpy).toHaveBeenCalledWith(RedisMessages.MissingOptions);
    });
  });

  describe('this.client.on()', () => {
    it('should log a message when connected', () => {
      mockRedis.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.Connect);
    });

    it('should log a message when ready', () => {
      mockRedis.emit('ready');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.Ready);
    });

    it('should log a message when reconnecting', () => {
      mockRedis.emit('reconnecting');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.Reconnect);
    });

    it('should log a message when closed', () => {
      mockRedis.emit('close');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.Close);
    });

    it('should log an error when an error is emitted by the client', () => {
      mockRedis.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(RedisMessages.Error, mockError);
    });
  });

  describe('.delete()', () => {
    beforeEach(() => {
      jest.spyOn(mockRedis, 'del').mockImplementation(() => Promise.resolve(1));
    });

    it('should call the .del() method on the redis client', async () => {
      await expect(redisClient.delete(mockKey)).resolves.toEqual(1);
      expect(mockRedis.del).toHaveBeenCalledWith(mockKey);
    });

    it('should reject with an error if .get() method is called before the client is initialized', async () => {
      await expect(uninitializedRedisClient.delete(mockKey)).rejects.toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(mockRedis.del).not.toHaveBeenCalled();
    });
  });

  describe('.get()', () => {
    beforeEach(() => {
      jest.spyOn(mockRedis, 'get').mockImplementation(() => Promise.resolve(mockValue));
    });

    it('should call the .get() method on the redis client', async () => {
      await expect(redisClient.get(mockKey)).resolves.toEqual(mockValue);
      expect(mockRedis.get).toHaveBeenCalledWith(mockKey);
    });

    it('should reject with an error if .get() method is called before the client is initialized', async () => {
      await expect(uninitializedRedisClient.get(mockKey)).rejects.toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(mockRedis.get).not.toHaveBeenCalled();
    });
  });

  describe('.increment()', () => {
    beforeEach(() => {
      jest.spyOn(mockRedis, 'incr').mockResolvedValue(mockCount + 1);
      jest.spyOn(mockRedis, 'incrby').mockResolvedValue(mockCount + mockIncrementValue);
    });

    it('should call the .incr() method on the redis client when not given an increment value', async () => {
      await expect(redisClient.increment(mockKey)).resolves.toEqual(mockCount + 1);
      expect(mockRedis.incr).toHaveBeenCalledWith(mockKey);
    });

    it('should call the .incrby() method on the redis client when given an increment value', async () => {
      await expect(redisClient.increment(mockKey, mockIncrementValue)).resolves.toEqual(mockCount + mockIncrementValue);
      expect(mockRedis.incrby).toHaveBeenCalledWith(mockKey, mockIncrementValue);
    });

    it('should reject with an error if .increment() method is called before the client is initialized', async () => {
      await expect(uninitializedRedisClient.increment(mockKey, mockIncrementValue)).rejects.toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(mockRedis.incr).not.toHaveBeenCalled();
      expect(mockRedis.incrby).not.toHaveBeenCalled();
    });
  });

  describe('.set()', () => {
    beforeEach(() => {
      const setSpy = jest.spyOn(mockRedis, 'set');
      // Bug in jest code prevents setSpy from resolving. The following type-cast allows expected resolution.
      (setSpy as unknown as jest.SpyInstance<Promise<'OK' | null>>).mockResolvedValue('OK');
    });

    it('should call the .set() method on the redis client', async () => {
      await expect(redisClient.set(mockKey, mockValue)).resolves.toEqual('OK');
      expect(mockRedis.set).toHaveBeenCalledWith(mockKey, mockValue);
    });

    it('should reject with an error if .set() method is called before the client is initialized', async () => {
      await expect(uninitializedRedisClient.set(mockKey, mockValue)).rejects.toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(mockRedis.set).not.toHaveBeenCalled();
    });
  });
});
