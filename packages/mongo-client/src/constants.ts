export enum MongoMessages {
  Connect = 'Connected to Mongo DB',
  Error = 'Mongo DB Error: ',

  MissingCredentials = 'Mongo DB configuration missing user:password',
  MissingConnection = 'Connection to Mongo DB has not been initialized',
  MissingOptions = 'Mongo DB configuration missing host:port',
}
