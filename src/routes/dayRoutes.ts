import { Router } from 'express';
import { get, toggle } from '../controllers/dayController';
import { checkAuth } from '../middleware/auth';

const router = Router();

router.route('/').get(get);

router.route('/toggle').post(checkAuth, toggle);

export default router;
