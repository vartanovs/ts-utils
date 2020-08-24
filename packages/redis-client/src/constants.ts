export enum RedisMessages {
  Connect = 'Connected to Redis server',
  MissingOptions = 'Redis configuration missing host:port - using defaults',
  Ready = 'Redis server ready to receive commands',
  Reconnect = 'Reconnected To Redis server',

  Close = 'Connection to Redis server has closed',
  Error = 'Redis Error: ',
}
