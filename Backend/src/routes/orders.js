import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { placeOrder, myOrders, getOrder, adminUpdateOrder } from '../controllers/orderController.js';

const router = Router();

router.use(requireAuth);
router.post('/', placeOrder);
router.get('/', myOrders);
router.get('/:id', getOrder);
router.put('/:id', requireRole('admin'), adminUpdateOrder);

export default router;
