import mongoose, { Document, Schema } from 'mongoose';

export interface ICalendar extends Document {
    name: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}

const calendarSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Calendar = mongoose.model<ICalendar>('Calendar', calendarSchema);

export default Calendar;
