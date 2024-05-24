import { MongoClient, ServerApiVersion } from 'mongodb';
import { CarsRepository } from './Cars';
import { UsersRepository } from './Users';

const username = process.env.MONGO_ATLAS_USERNAME;
const password = process.env.MONGO_ATLAS_PASSWORD;
const dbName = process.env.MONGO_ATLAS_DB_NAME;

const uri = `mongodb+srv://${username}:${password}@hino-2-cluster.yminm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=hino-2-cluster`;

export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const mongoClientDb = mongoClient.db();

export const carsRepository = new CarsRepository(mongoClientDb);
export const usersRepository = new UsersRepository(mongoClientDb);
