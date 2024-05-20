import { Request, Response } from 'express';
import Calendar from '../models/Calendar';
import Day from '../models/Day';
import { generateDaysForYear } from '../utils/daysGenerator';

export const createCalendar = async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    const currentYear = new Date().getFullYear();
    // @ts-ignore
    const userId = user.uid;

    try {
        const newCalendar = new Calendar({
            name,
            user: userId
        });
        const savedCalendar = await newCalendar.save();

        const days = generateDaysForYear(currentYear).map(day => ({
            ...day,
            calendar: savedCalendar._id
        }));
        await Day.insertMany(days);

        const createdDays = await Day.find({ calendar: savedCalendar._id });

        res.status(201).json({
            message: 'Calendar created successfully',
            calendar: savedCalendar,
            days: createdDays
        });
    } catch (error) {
        console.error('Failed to create calendar:', error);
        res.status(500).json({ message: 'Failed to create calendar', error: error.message });
    }
};

export const getUserCalendars = async (req: Request, res: Response) => {
    const user = req.user;

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

export const getCalendarDays = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    // @ts-ignore
    const userId = user.uid;

    try {
        const calendar = await Calendar.findById(id);

        if (!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        if (calendar.user.toString() !== userId) {
            return res.status(403).json({ message: 'User not authorized to view this calendar' });
        }

        const days = await Day.find({ calendar: id });
        res.status(200).json(days);
    } catch (error) {
        console.error('Failed to fetch days:', error);
        res.status(500).json({ message: 'Failed to fetch days', error: error.message });
    }
};

export const toggleCalendarDay = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' });
    }

    // @ts-ignore
    const userId = user.uid;

    try {
        const day = await Day.findById(_id).populate('calendar');
        if (!day) {
            return res.status(404).json({ message: 'Day not found' });
        }
        // @ts-ignore
        if (day.calendar.user.toString() !== userId) {
            return res.status(403).json({ message: 'User not authorized to update this day' });
        }

        day.isActive = !day.isActive;
        await day.save();
        res.status(200).json({ message: 'Day toggled successfully', _id, newStatus: day.isActive });
    } catch (err) {
        console.error('Error toggling day:', err);
        res.status(500).json({ message: 'Error toggling day', error: err.message });
    }
};
