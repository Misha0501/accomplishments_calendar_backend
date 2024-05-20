import { Request, Response } from 'express';
import Calendar from '../models/Calendar';
import Day from '../models/Day';
import { generateDaysForYear } from '../utils/daysGenerator';

export const createCalendar = async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = req.user;  // TypeScript should now recognize the type of `req.user`

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    const currentYear = new Date().getFullYear();

    // @ts-ignore
    const userId = user.uid; // Use `uid` from Firebase token

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

        // Retrieve the created days to include in the response
        const createdDays = await Day.find({ calendar: savedCalendar._id });

        res.status(201).json({
            message: 'Calendar created successfully',
            calendar: savedCalendar,
            days: createdDays  // Include days in the response
        });
    } catch (error) {
        console.error('Failed to create calendar:', error);
        res.status(500).json({ message: 'Failed to create calendar', error: error.message });
    }
};

export const getUserCalendars = async (req: Request, res: Response) => {
    const user = req.user;  // TypeScript should now recognize the type of `req.user`

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    // @ts-ignore
    const userId = user.uid;

    try {
        const calendars = await Calendar.find({ user: userId });
        res.status(200).json(calendars);
    } catch (error) {
        console.error('Failed to fetch calendars:', error);
        res.status(500).json({ message: 'Failed to fetch calendars', error: error.message });
    }
};
