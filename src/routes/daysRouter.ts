import { Router } from 'express';
import {getDays, toggleDay} from "../models/dayModel";

const router = Router();



router.get('/', async (req, res) => {
    res.json(await getDays());
});

router.post('/toggle', async (req, res) => {
    const { index } = req.body;
    await toggleDay(index);

    res.json({ status: 'Success' });
});
export default router;
