import mongoose, { Document, Schema } from 'mongoose';
import {daySchema, IDay} from './Day';  // Ensure you use the named export

export interface ICalendar extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    days: IDay[];
}

const calendarSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    days: [daySchema]
});

const Calendar = mongoose.model<ICalendar>('Calendar', calendarSchema);

export default Calendar;
