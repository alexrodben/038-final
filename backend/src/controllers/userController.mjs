import bcrypt from 'bcrypt'; // Importar bcrypt para el hashing de contraseñas
import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo usuario
const createUser = (req, res) => {
    const { username, password, rol, estado, colaborador_id } = req.body;

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10); // Puedes ajustar el número de rondas

    const query = 'INSERT INTO Usuarios (username, password, rol, estado, colaborador_id) VALUES (?, ?, ?, ?, ?)';
    db.execute(query, [username, hashedPassword, rol, estado, colaborador_id], (err, results) => {
        if (err) {
            logger.error('Error al crear el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Usuario creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
    });
};

// Función para obtener todos los usuarios
const getAllUsers = (req, res) => {
    const query = 'SELECT id, username, rol, estado FROM Usuarios';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un usuario por su ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, username, rol, estado FROM Usuarios WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un usuario
const updateUser = (req, res) => {
    const { id, username, rol, estado, colaborador_id } = req.body;

    const query = 'UPDATE Usuarios SET username = ?, rol = ?, estado = ?, colaborador_id = ? WHERE id = ?';
    db.execute(query, [username, rol, estado, colaborador_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Usuario actualizado exitosamente', { id });
        return res.json({ message: 'Usuario actualizado exitosamente' });
    });
};

// Función para eliminar un usuario
const deleteUser = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Usuarios WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Usuario eliminado exitosamente', { id });
        return res.json({ message: 'Usuario eliminado exitosamente' });
    });
};

export { createUser, deleteUser, getAllUsers, getUserById, updateUser };

