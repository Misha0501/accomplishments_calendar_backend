import mongoose, { Schema, Document } from 'mongoose';

export interface IDay extends Document {
    day: string;
    date: string;
    isActive: boolean;
    calendar: Schema.Types.ObjectId;
}

export const daySchema = new Schema<IDay>({
    day: { type: String, required: true },
    date: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    calendar: { type: Schema.Types.ObjectId, ref: 'Calendar' }
});

const Day = mongoose.model<IDay>('Day', daySchema);

export default Day;
