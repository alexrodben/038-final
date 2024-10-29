import express, { json } from 'express';
import logger from './config/logger.mjs';
import cors from './middleware/cors.mjs';
import authRoutes from './routes/authRoutes.mjs';

const app = express();
const PORT = process.env.PORT;

// Habilitar CORS para todas las rutas
app.use(cors);

// Para manejar JSON
app.use(json());

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
