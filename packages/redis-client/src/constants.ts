export enum RedisMessages {
  CONNECT = 'Connected to Redis server',
  MISSING_CONFIG = 'Redis configuration missing host:port - using defaults',
  READY = 'Redis server ready to receive commands',
  RECONNECT = 'Reconnected To Redis server',

  CLOSE = 'Connection to Redis server has closed',
  ERROR = 'Redis Error: ',
}