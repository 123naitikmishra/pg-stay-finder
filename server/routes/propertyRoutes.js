import express from 'express';
import { propertyController } from '../controllers/propertyController.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', propertyController.getAll);
router.get('/:id', propertyController.getById);

// Protected routes for owners/admins
router.post('/', authMiddleware, requireRole(['Owner', 'Admin']), propertyController.create);
router.put('/:id', authMiddleware, requireRole(['Owner', 'Admin']), propertyController.update);
router.delete('/:id', authMiddleware, requireRole(['Owner', 'Admin']), propertyController.delete);

export default router;
