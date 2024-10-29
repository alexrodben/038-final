import dotenv from 'dotenv';
import { createConnection } from 'mysql2';
import logger from './logger.mjs';
dotenv.config();


// Crear la conexión
const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        logger.error('Error conectando a la base de datos:', err);
        return;
    }
    logger.info('Conectado a la base de datos MySQL', process.env.DB_NAME);
});

// Exportar la conexión
export default connection;
