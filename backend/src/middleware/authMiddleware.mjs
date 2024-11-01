// authMiddleware.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.mjs';
dotenv.config();

// Clave secreta para firmar el token (usa una más segura en producción y guárdala en una variable de entorno)
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    logger.info("Iniciando peticion...");
    logger.info(`Datos recibidos: `, req.body);

    // Obtener la URL completa del endpoint
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    logger.info(`Endpoint solicitado: ${fullUrl}`);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    logger.info(`Token Authorization: ${token}`);

    if (!token) return res.status(401).json({ message: 'Accesso denegado, credenciales invalidas' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            logger.error('Invalid token from middleware', err);
            return res.status(403).json({ message: 'token invalido o vencido, su acceso a sido denegado' });
        }
        req.user = user;
        next();
    });
};

export { authenticateToken };

