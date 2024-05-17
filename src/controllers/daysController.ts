import databaseService from "../services/database.service";
import {generateDaysForYear} from "../utils/daysGenerator";
import {Day} from "../types";
import {ObjectId} from "mongodb";

export const get = async (req, res) => {
    const year = new Date().getFullYear();
    const collection = databaseService.getInstance().getCollection('days');

    // Check if days already exist for this year
    const existingDays = await collection.find({date: {$regex: `^${year}-`}}).toArray();
    if (existingDays.length > 0) {
        return res.status(200).json({message: 'Days for this year already generated', days: existingDays});
    }

    // Generate days for the year
    const days = generateDaysForYear(year);
    await collection.insertMany(days);
    res.status(201).json({message: 'Days generated successfully', days});
};


// Route to toggle the isActive state of a day
export const toggle = async (req, res) => {
    const {_id} = req.body; // Expect _id to be passed in the request body
    const collection = databaseService.getInstance().getCollection<Day>('days');

    try {
        // Use the ObjectId to query the document
        const day = await collection.findOne({_id: new ObjectId(_id)});

        if (day) {
            // Toggle isActive using MongoDB's updateOne
            const updatedDay = await collection.updateOne(
                {_id: new ObjectId(_id)},
                {$set: {isActive: !day.isActive}}
            );
            if (updatedDay.modifiedCount === 1) {
                res.status(200).json({message: 'Day toggled successfully', _id, newStatus: !day.isActive});
            } else {
                throw new Error("Day status not updated");
            }
        } else {
            res.status(404).json({message: "Day not found"});
        }
    } catch (err) {
        console.error('Error toggling day:', err);
        res.status(500).json({message: 'Error toggling day', error: err.message});
    }
};



