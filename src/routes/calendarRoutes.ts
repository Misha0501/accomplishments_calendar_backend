import express from 'express';
import passport from 'passport';
import { createCalendar } from '../controllers/calendarController';

const router = express.Router();

// Secure the route with JWT authentication
router.post('/create', passport.authenticate('jwt', { session: false }), createCalendar);

export default router;
