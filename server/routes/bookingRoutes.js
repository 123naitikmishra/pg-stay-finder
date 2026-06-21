import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', bookingController.create);
router.get('/', bookingController.getAll);

export default router;
