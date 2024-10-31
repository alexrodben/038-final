import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo tipo de tarea
const createTaskType = (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Tipos_Tarea (nombre) VALUES (?)';
    db.execute(query, [nombre], (err, results) => {
        if (err) {
            logger.error('Error al crear el tipo de tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Tipo de tarea creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Tipo de tarea creado exitosamente', taskTypeId: results.insertId });
    });
};

// Función para obtener todos los tipos de tarea
const getAllTaskTypes = (req, res) => {
    const query = 'SELECT id, nombre FROM Tipos_Tarea';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener tipos de tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un tipo de tarea por su ID
const getTaskTypeById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nombre FROM Tipos_Tarea WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el tipo de tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Tipo de tarea no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un tipo de tarea
const updateTaskType = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE Tipos_Tarea SET nombre = ? WHERE id = ?';
    db.execute(query, [nombre, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el tipo de tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tipo de tarea no encontrado' });
        }
        logger.info('Tipo de tarea actualizado exitosamente', { id });
        return res.json({ message: 'Tipo de tarea actualizado exitosamente' });
    });
};

// Función para eliminar un tipo de tarea
const deleteTaskType = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Tipos_Tarea WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el tipo de tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tipo de tarea no encontrado' });
        }
        logger.info('Tipo de tarea eliminado exitosamente', { id });
        return res.json({ message: 'Tipo de tarea eliminado exitosamente' });
    });
};

export { createTaskType, deleteTaskType, getAllTaskTypes, getTaskTypeById, updateTaskType };
