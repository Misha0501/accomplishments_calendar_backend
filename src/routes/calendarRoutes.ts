import express from 'express';
import {createCalendar, getUserCalendars} from '../controllers/calendarController';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

// Secure the route with JWT authentication
router.post('/create', checkAuth, createCalendar);
router.get('/user', checkAuth, getUserCalendars);

export default router;
