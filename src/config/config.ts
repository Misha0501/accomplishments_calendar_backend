export default {
    mongoURI: process.env.MONGO_URI as string,
    dbName: process.env.DB_NAME as string,
    collectionName: process.env.COLLECTION_NAME as string
};
