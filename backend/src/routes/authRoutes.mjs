import { Router } from 'express';
import { login, profile } from '../controllers/authController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = Router();

// Ruta para login
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, profile);

export default router;
