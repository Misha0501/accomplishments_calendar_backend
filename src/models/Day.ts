import mongoose, { Document } from 'mongoose';

export interface IDay extends Document {
    date: string;
    isActive: boolean;
}

const daySchema = new mongoose.Schema({
    date: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false }
});

const Day = mongoose.model<IDay>('Day', daySchema);

export default Day;
