// authMiddleware.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.mjs';
dotenv.config();

// Clave secreta para firmar el token (usa una más segura en producción y guárdala en una variable de entorno)
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    logger.info('Encabezado Authorization:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    logger.info('Token extraído:', token);

    if (!token) return res.status(401).json({ message: 'Access denied from middleware' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            logger.error('Invalid token from middleware', err);
            return res.status(403).json({ message: 'Invalid token from middleware' });
        }
        req.user = user;
        next();
    });
};

export { authenticateToken };

