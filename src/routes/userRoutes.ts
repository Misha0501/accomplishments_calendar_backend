import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { checkAuth } from '../middleware/auth';

const router = Router();

// Secure the route with JWT authentication
router.post('/register', checkAuth, registerUser);

export default router;
