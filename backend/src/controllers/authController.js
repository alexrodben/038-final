const db = require('../config/db'); // Importar la conexión a la base de datos

const login = (req, res) => {
    const { username, password } = req.body;

    // Consulta para verificar usuario y contraseña
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.execute(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            // Usuario encontrado
            return res.json({ message: 'Inicio de sesión exitoso', user: username });
        } else {
            // Usuario no encontrado
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
};

module.exports = { login };
