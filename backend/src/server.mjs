import express, { json } from 'express';
import logger from './config/logger.mjs';
import cors from './middleware/cors.mjs';
import authRoutes from './routes/authRoutes.mjs';
import freeRoutes from './routes/freeRoutes.mjs';

const app = express();
const PORT = process.env.PORT;

// Habilitar CORS para todas las rutas
app.use(cors);

// Para manejar JSON
app.use(json());

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Usar las rutas de acceso libre
app.use('/api', freeRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
