import mongoose from 'mongoose';
import {ServerApiVersion} from "mongodb";

const mongoUri = "mongodb+srv://mishagalenda:JRznioeAwQstdG6M@clustertest.6fpeicj.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ClusterTEST"

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, options);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
