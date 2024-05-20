import mongoose, { Schema, Document } from 'mongoose';

interface IDay extends Document {
    date: string;
    day: string;
    isActive: boolean;
    calendar: mongoose.Types.ObjectId; // Reference to the calendar
}

const DaySchema: Schema = new Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    calendar: { type: mongoose.Types.ObjectId, ref: 'Calendar', required: true } // Reference to calendar
});

export default mongoose.model<IDay>('Day', DaySchema);
