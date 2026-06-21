import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

router.get('/favorites', userController.getFavorites);
router.post('/favorites', userController.addFavorite);
router.post('/favorites/remove', userController.removeFavorite);

export default router;
