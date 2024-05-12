import {Request, Response, Router} from 'express';
import UserModel from '../models/userModel';
import {fetchUsersInBatches} from "../utils/fetchUsersInBatches";
import {setupSSE} from "../middlewares/setupSSE";

const router = Router();

// GET all users
router.get('/users', async (req, res) => {
    try {
        // sort by creation date
        const users = await UserModel.find().sort({_id: -1});
        res.json(users);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({message: error.message});
    }
});

// Get user by email
router.get('/user', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({message: 'Email parameter is required'});
    }

    try {
        const user = await UserModel.findOne({email: email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});


// Route to update a user
router.put('/user/:id', async (req, res) => {
    const userId = req.params.id; // Accessing the user ID from URL parameter
    const updates = req.body; // The data for updating the user, sent in the body of the request

    try {
        // The { new: true } option ensures that the response will contain the updated document.
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {new: true});
        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updatedUser);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});


// Route to delete a user
router.delete('/user/:id', async (req, res) => {
    const userId = req.params.id; // Accessing the user ID from URL parameter

    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});


// Route to fetch users in batches
router.get('/users/batch', async (req, res) => {
    const batchSize = 10;
    const userIterator = fetchUsersInBatches(batchSize);

    try {
        const batch = await userIterator.next();
        res.json({
            users: batch.value,
            done: batch.done
        });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

router.get('/users/process-batch', async (req, res) => {
    const batchSize = 10;
    const userIterator = fetchUsersInBatches(batchSize);

    try {
        for await (const users of userIterator) {
            // Process each batch here, e.g., update status, send emails
            console.log(`Processing ${users.length} users`);
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1000));

        }
        res.send('Completed processing users in batches.');
    } catch (error) {
        // @ts-ignore
        res.status(500).json({message: error.message});
    }
});

router.get('/users/stream', setupSSE, async (req: Request, res: Response) => {
    const batchSize = 10;
    const lastId = req.query.lastId as string | undefined;

    const userIterator = fetchUsersInBatches(batchSize, lastId);

    try {
        for await (const users of userIterator) {
            if (users.length > 0) {
                res.write(`data: ${JSON.stringify(users)}\n\n`);
                // Simulate processing time
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                break; // No more users to send, break the loop
            }
        }
        res.write('event: complete\ndata: {}\n\n');
        res.end();
    } catch (error) {
        // @ts-ignore
        res.status(500).write(`event: error\ndata: ${JSON.stringify({message: error.message})}\n\n`);
        res.end();
    }
});

export default router;
