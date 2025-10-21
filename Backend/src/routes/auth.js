import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me, refresh, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').optional().isString(),
    body('lastName').optional().isString(),
  ],
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);
router.get('/me', requireAuth, me);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
