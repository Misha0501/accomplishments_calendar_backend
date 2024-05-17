import {Router} from 'express';
import {get, toggle} from '../controllers/daysController';

const router = Router();

router.route('/').get(get);

router.route('/toggle').post(toggle);

// export default app
export default router;

