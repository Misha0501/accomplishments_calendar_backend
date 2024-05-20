import express from 'express';
import {createCalendar, getCalendarDays, getUserCalendars, toggleCalendarDay} from '../controllers/calendarController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

// Secure the route with JWT authentication
router.post('/create', checkAuth, createCalendar);
router.get('/user', checkAuth, getUserCalendars);
router.get('/:id/days', checkAuth, getCalendarDays);
router.post('/:id/days/toggle', checkAuth, toggleCalendarDay);

export default router;
