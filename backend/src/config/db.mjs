import dotenv from 'dotenv';
import { createPool } from 'mysql2';
import logger from './logger.mjs';
dotenv.config();

// Crear el pool de conexiones
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0        // Sin límite en la cola de espera
});

// Probar la conexión
pool.getConnection((err, connection) => {
    if (err) {
        logger.error('Error al conectar al pool de la base de datos:', err);
        return;
    }
    // Registrar éxito en la conexión
    logger.info(`Conexión al pool de la base de datos MySQL exitosa`, {
        dbName: process.env.DB_NAME,
        host: process.env.DB_HOST
    });
    connection.release(); // Libera la conexión después de probar
});

// Función auxiliar para formatear las fechas a MySQL
export function formatToMySQLDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

// Exportar el pool
export default pool;