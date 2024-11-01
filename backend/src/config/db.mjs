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

// Función auxiliar para formatear las fechas a MySQL
export function formatToMySQLDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

// Exportar la conexión
export default connection;
