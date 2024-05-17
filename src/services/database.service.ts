import mongoose from 'mongoose';
import config from '../config/config';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            dbName: config.dbName
        });
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};
