import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

router.get('/', listCategories);
router.post('/', requireAuth, requireRole('admin'), createCategory);
router.put('/:id', requireAuth, requireRole('admin'), updateCategory);
router.delete('/:id', requireAuth, requireRole('admin'), deleteCategory);

export default router;
