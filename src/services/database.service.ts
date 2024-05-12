import { MongoClient, Db, Collection } from 'mongodb';
import config from '../config/config';

class DatabaseService {
    private static instance: DatabaseService;
    private dbClient: MongoClient;
    private database: Db;

    private constructor() {
        this.dbClient = new MongoClient(config.mongoURI);
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async connect() {
        await this.dbClient.connect();
        this.database = this.dbClient.db(config.dbName);
        console.log('Connected to MongoDB at', config.dbName);
    }

    public getCollection<T>(collectionName: string): Collection<T> {
        return this.database.collection<T>(collectionName);
    }
}

export default DatabaseService;
