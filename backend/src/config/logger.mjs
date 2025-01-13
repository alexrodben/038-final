import path from 'path'; // Para manejar rutas
import { fileURLToPath } from 'url';
import { createLogger, format, transports } from 'winston';

// Re-creando __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta del directorio de logs en la raíz del proyecto
const logsDir = path.resolve(__dirname, '../../logs'); // Dos niveles hacia arriba para llegar a la raíz
const logFilePath = path.join(logsDir, 'app.log');

// Asegurarse de que el directorio de logs exista
import fs from 'fs';

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true }); // Crear el directorio si no existe
}

// Configuración del logger
const logger = createLogger({
    level: 'info', // Nivel de logging
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Formato de la marca de tiempo
        format.printf(({ timestamp, level, message, stack, ...meta }) => {
            if (level !== 'error') {
                const metaString = Object.keys(meta).length ? JSON.stringify(meta) : ''; // Convertir el objeto adicional a una cadena JSON
                return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaString}`.trim(); // Incluir el objeto adicional
            } else {
                console.error(meta); // Imprimir el stack trace en la consola
                return `[${timestamp}] ${level.toUpperCase()}: ${message}\nStack Trace: ${stack}`; // Incluye stack trace
            }
        })
    ),
    transports: [
        new transports.File({ filename: logFilePath }), // Archivo para guardar logs
        new transports.Console() // También muestra los logs en la consola
    ],
});

export default logger;
