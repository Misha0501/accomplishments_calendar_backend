import { Request, Response } from 'express'
import Calendar from '../models/Calendar'
import Day from '../models/Day'

export const registerUser = async (req: Request, res: Response) => {
    const { calendarData, calendarName } = req.body
    const user = req.user

    if (!user) {
        return res.status(401).json({ message: 'No authenticated user' })
    }

    // @ts-ignore
    const userId = user.uid

    try {
        const newCalendar = new Calendar({
            name: calendarName,
            user: userId
        })
        const savedCalendar = await newCalendar.save()

        const days = calendarData.map(day => ({
            date: day.date,
            day: day.day,
            isActive: day.isActive,
            calendar: savedCalendar._id
        }))
        await Day.insertMany(days)

        res.status(201).json({ message: 'User registered and calendar transferred successfully', calendarId: savedCalendar._id })
    } catch (error) {
        console.error('Failed to register user:', error)
        res.status(500).json({ message: 'Failed to register user', error: error.message })
    }
}
