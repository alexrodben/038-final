import { Router } from 'express';
import { login, profile } from '../controllers/authController.mjs';

const router = Router();

// Ruta para login
router.post('/auth/login', login);
router.get('/auth/profile', profile);

export default router;
