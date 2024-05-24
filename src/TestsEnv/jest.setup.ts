import { mongoClient } from '../DB';

beforeAll(async () => {
  console.log('!!! ENVIROMENT IS', process.env.NODE_ENV);

  await mongoClient.connect();
  await mongoClient.db().command({ ping: 1 });
}, 60000);

afterAll(async () => {
  await mongoClient.close();
});
