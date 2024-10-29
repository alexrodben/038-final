import { Router } from 'express';
import { login, profile } from '../controllers/authController.mjs';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = Router();

// Ruta para login
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, profile);

// Rutas para usuarios
router.post('/users', authenticateToken, createUser);
router.get('/users', authenticateToken, getAllUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.put('/users', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);


export default router;
