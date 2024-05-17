import { Router } from 'express';
import User from '../models/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ user, token });
        });
    })(req, res, next);
});

export default router;

