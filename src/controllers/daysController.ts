import express from 'express';
import { getDays, toggleDay } from '../models/dayModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const days = await getDays();
    res.json(days);
});

router.post('/toggle', async (req, res) => {
    const { id } = req.body;
    await toggleDay(id);
    res.json({ status: 'Success' });
});

export default router;
