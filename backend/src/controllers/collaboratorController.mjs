import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo colaborador
const createCollaborator = (req, res) => {
    const { nombre_completo, rol, email, telefono, estado, horas_semanales } = req.body;

    const query = 'INSERT INTO Colaboradores (nombre_completo, rol, email, telefono, estado, horas_semanales) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [nombre_completo, rol, email, telefono, estado, horas_semanales], (err, results) => {
        if (err) {
            logger.error('Error al crear el colaborador:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Colaborador creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Colaborador creado exitosamente', colaboradorId: results.insertId });
    });
};

// Función para obtener todos los colaboradores
const getAllCollaborators = (req, res) => {
    const query = 'SELECT id, nombre_completo, rol, email, estado, telefono, horas_semanales FROM Colaboradores';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener colaboradores:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un colaborador por su ID
const getCollaboratorById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nombre_completo, rol, email, estado, telefono, horas_semanales FROM Colaboradores WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el colaborador:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un colaborador
const updateCollaborator = (req, res) => {
    const { id, nombre_completo, rol, email, telefono, estado, horas_semanales } = req.body;

    const query = 'UPDATE Colaboradores SET nombre_completo = ?, rol = ?, email = ?, telefono = ?, estado = ?, horas_semanales = ? WHERE id = ?';
    db.execute(query, [nombre_completo, rol, email, telefono, estado, horas_semanales, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el colaborador:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Colaborador actualizado exitosamente', { id });
        return res.json({ message: 'Colaborador actualizado exitosamente' });
    });
};

// Función para eliminar un colaborador
const deleteCollaborator = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Colaboradores WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el colaborador:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }
        logger.info('Colaborador eliminado exitosamente', { id });
        return res.json({ message: 'Colaborador eliminado exitosamente' });
    });
};

export { createCollaborator, deleteCollaborator, getAllCollaborators, getCollaboratorById, updateCollaborator };

