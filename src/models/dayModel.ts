import { ObjectId } from 'mongodb';
import DatabaseService from '../services/database.service';
import { Day } from '../types';
import * as mongoose from "mongoose";

// export const getDays = async (): Promise<Day[]> => {
//     const collection = DatabaseService.getInstance().getCollection<Day>('days');
//     return await collection.find({}).toArray();
// };
//
// export const toggleDay = async (id: string): Promise<void> => {
//     const collection = DatabaseService.getInstance().getCollection<Day>('days');
//     const document = await collection.findOne({ _id: new ObjectId(id) });
//
//     if (document) {
//         await collection.updateOne(
//             { _id: new ObjectId(id) },
//             { $set: { isActive: !document.isActive } }
//         );
//     }
// };

const daySchema = new mongoose.Schema({
    date: String,
    isActive: Boolean
});

const Day = mongoose.model('Day', daySchema);

export default Day;
