import { ObjectId } from 'mongodb';
import DatabaseService from '../services/database.service';
import { Day } from '../types';

export const getDays = async (): Promise<Day[]> => {
    const collection = DatabaseService.getInstance().getCollection<Day>('days');
    return await collection.find({}).toArray();
};

export const toggleDay = async (id: string): Promise<void> => {
    const collection = DatabaseService.getInstance().getCollection<Day>('days');
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (document) {
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { isActive: !document.isActive } }
        );
    }
};
