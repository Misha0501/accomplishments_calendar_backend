import mongoose from "mongoose";
import {ServerApiVersion} from "mongodb";

const mongo = {
        uri: "mongodb+srv://mishagalenda:JRznioeAwQstdG6M@clustertest.6fpeicj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTEST",
        options: {
            keepAlive: 1000,
            autoReconnect: true,
            reconnectTries: 5,
            reconnectInterval: 3000,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        },
    }

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
    console.info('Connected To DB');
});


/**
 * Connect to mongo db
 * @returns {object} Mongoose connection
 * @public
 */
export const Connect = () => {
    mongoose.connect(mongo.uri, mongo.options);
    return mongoose.connection;
};

