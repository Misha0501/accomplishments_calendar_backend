import { Router } from 'express';
import UserModel from '../models/userModel';

const router = Router();

async function* dataGenerator() {
    let count = 0;
    while (count < 10) {
        // sleep for 1 second
        await new Promise(resolve => setTimeout(resolve, 10));
        yield count++;
    }
}
// GET all users
router.get('/iterator', async (req, res) => {
    const generator = dataGenerator();
    try {
        for await (let value of generator) {
            if (req.aborted) {
                return; // End the response if client disconnects
            }
            res.write(JSON.stringify({ value }));
        }
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

export default router;
