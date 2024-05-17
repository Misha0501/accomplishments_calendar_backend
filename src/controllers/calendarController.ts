import { Request, Response } from 'express';
import Calendar from '../models/Calendar';
import Day from '../models/Day';
import { generateDaysForYear } from '../utils/daysGenerator';

export const createCalendar = async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = req.user;  // TypeScript should now recognize the type of `req.user`

    const currentYear = new Date().getFullYear();

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    // @ts-ignore
    const userId = user._id;

    try {
        const newCalendar = new Calendar({
            name,
            user: userId
        });
        const savedCalendar = await newCalendar.save();

        // Generate days for the year and link them to the calendar
        const days = generateDaysForYear(currentYear).map(day => ({
            ...day,
            calendar: savedCalendar._id  // Link each day to the newly created calendar
        }));
        await Day.insertMany(days);

        res.status(201).json({ message: 'Calendar created successfully', calendar: savedCalendar });
    } catch (error) {
        console.error('Failed to create calendar:', error);
        res.status(500).json({ message: 'Failed to create calendar', error: error.message });
    }
};
