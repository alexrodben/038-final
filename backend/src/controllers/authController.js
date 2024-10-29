const login = (req, res) => {
    const { username, password } = req.body;

    // Aquí iría tu lógica de autenticación
    // Por ejemplo, verificar usuario y contraseña en la base de datos.

    // Responder al cliente
    res.json({ message: 'Inicio de sesión exitoso', user: username });
};

module.exports = { login };
