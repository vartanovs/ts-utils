import Redis from 'ioredis';

import RedisClient from '../src/client';
import { RedisMessages } from '../src/constants';

describe('server/lib/redisClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;
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

    consoleLogSpy = spyOn(console, 'log').and.callFake(() => {});
    consoleWarnSpy = spyOn(console, 'warn').and.callFake(() => {});
    consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});
  });

  describe('new RedisClient.init()', () => {
    it('should pass redis options thru to ioredis.Redis', () => {
      new RedisClient(mockOptions).init();
      expect(Redis).toHaveBeenCalledWith(mockOptions);
    });

    it('should log a warning if host or port are missing from options', () => {
      new RedisClient().init();
      expect(Redis).toHaveBeenCalledWith(undefined);
      expect(consoleWarnSpy).toHaveBeenCalledWith(RedisMessages.MISSING_OPTIONS);
    });
  })

  describe('this.client.on()', () => {
    it('should log a message when connected', () => {
      mockRedis.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.CONNECT);
    });

    it('should log a message when ready', () => {
      mockRedis.emit('ready');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.READY);
    });

    it('should log a message when reconnecting', () => {
      mockRedis.emit('reconnecting');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.RECONNECT);
    });

    it('should log a message when closed', () => {
      mockRedis.emit('close');
      expect(consoleLogSpy).toHaveBeenCalledWith(RedisMessages.CLOSE);
    });

    it('should log an error when an error is emitted by the client', () => {
      mockRedis.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(RedisMessages.ERROR, mockError);
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
      jest.spyOn(mockRedis, 'incr').mockImplementation(() => Promise.resolve(mockCount + 1));
      jest.spyOn(mockRedis, 'incrby').mockImplementation(() => Promise.resolve(mockCount + mockIncrementValue));
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
      jest.spyOn(mockRedis, 'set').mockImplementation(() => Promise.resolve(mockValue));
    });

    it('should call the .set() method on the redis client', async () => {
      await expect(redisClient.set(mockKey, mockValue)).resolves.toEqual(mockValue);
      expect(mockRedis.set).toHaveBeenCalledWith(mockKey, mockValue);
    });
    
    it('should reject with an error if .set() method is called before the client is initialized', async () => {
      await expect(uninitializedRedisClient.set(mockKey, mockValue)).rejects.toThrowError();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(mockRedis.set).not.toHaveBeenCalled();
    });
  });
});