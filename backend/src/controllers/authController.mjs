import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger
dotenv.config();

// Clave secreta para firmar el token (usa una más segura en producción y guárdala en una variable de entorno)
const SECRET_KEY = process.env.SECRET_KEY;

const login = (req, res) => {
    logger.info("Iniciando sesión...");
    const { username, password } = req.body;
    logger.info('Datos recibidos', req.body);
    // Consulta para verificar usuario y contraseña
    const query = 'SELECT * FROM Usuarios WHERE username = ? AND password = ?';
    db.execute(query, [username, password], (err, results) => {
        if (err) {
            logger.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            // Datos a incluir en el token
            const { password, ...userWithoutPassword } = results[0]; // Excluir el campo "password"
            // Generar el token
            const token = jwt.sign(userWithoutPassword, SECRET_KEY, { expiresIn: '1h' });
            // Usuario encontrado
            logger.info('Inicio de sesión exitoso', { user: userWithoutPassword });
            return res.json({ message: 'Inicio de sesión exitoso', token });
        } else {
            // Usuario no encontrado
            logger.info('Credenciales incorrectas');
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
};

const profile = (req, res) => {
    logger.info("Consultando perfil...");
    const user = req.user;
    // Usuario del token
    logger.info('Token válido', user);
    return res.json(user);
}

export { login, profile };

