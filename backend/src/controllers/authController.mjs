import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

const login = (req, res) => {
    logger.info("Iniciando sesión...");
    const { username, password } = req.body;
    logger.info('Iniciando sesión...', { username: req.body.username, password: req.body.password }); // Usar un objeto para el mensaje

    // Consulta para verificar usuario y contraseña
    const query = 'SELECT * FROM Usuarios WHERE username = ? AND password = ?';
    db.execute(query, [username, password], (err, results) => {
        if (err) {
            logger.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            // Usuario encontrado
            logger.info('Inicio de sesión exitoso', results[0]);
            return res.json({ message: 'Inicio de sesión exitoso', user: username });
        } else {
            // Usuario no encontrado
            logger.info('Credenciales incorrectas');
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
};

export { login };
