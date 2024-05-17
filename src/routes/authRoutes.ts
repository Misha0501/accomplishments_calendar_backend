import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import passport from "passport";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();

        // Generate JWT token after successful registration
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Send the new user data and the token back to the client
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token: token
        });
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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return res.json({ user, token });
        });
    })(req, res, next);
});

export default router;
