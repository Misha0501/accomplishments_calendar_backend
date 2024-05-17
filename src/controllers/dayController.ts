import Day from "../models/Day";
import {generateDaysForYear} from "../utils/daysGenerator";
import {Request, Response} from 'express';

export const get = async (req: Request, res: Response) => {
    const year = new Date().getFullYear();
    let existingDays = await Day.find({date: {$regex: `^${year}-`}});

    if (existingDays.length > 0) {
        return res.status(200).json({message: 'Days for this year already generated', days: existingDays});
    }

    const days = generateDaysForYear(year);
    await Day.insertMany(days);
    res.status(201).json({message: 'Days generated successfully', days});
};

export const toggle = async (req: Request, res: Response) => {
    const {_id} = req.body;
    try {
        const day = await Day.findById(_id);
        if (!day) {
            return res.status(404).json({message: "Day not found"});
        }

        day.isActive = !day.isActive;
        await day.save();
        res.status(200).json({message: 'Day toggled successfully', _id, newStatus: day.isActive});
    } catch (err) {
        console.error('Error toggling day:', err);
        res.status(500).json({message: 'Error toggling day', error: err.message});
    }
};
