import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear una nueva asignación
const createAssignment = (req, res) => {
    const { tarea_id, colaborador_id, fecha_asignacion } = req.body;
    const query = 'INSERT INTO Asignaciones (tarea_id, colaborador_id, fecha_asignacion) VALUES (?, ?, ?)';
    db.execute(query, [tarea_id, colaborador_id, fecha_asignacion], (err, results) => {
        if (err) {
            logger.error('Error al crear la asignación:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Asignación creada exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Asignación creada exitosamente', assignmentId: results.insertId });
    });
};

// Función para obtener todas las asignaciones
const getAllAssignments = (req, res) => {
    const query = 'SELECT id, tarea_id, colaborador_id, fecha_asignacion FROM Asignaciones';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener asignaciones:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener una asignación por su ID
const getAssignmentById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Asignaciones WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener la asignación:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar una asignación
const updateAssignment = (req, res) => {
    const { id } = req.params;
    const { tarea_id, colaborador_id, fecha_asignacion } = req.body;
    const query = 'UPDATE Asignaciones SET tarea_id = ?, colaborador_id = ?, fecha_asignacion = ? WHERE id = ?';
    db.execute(query, [tarea_id, colaborador_id, fecha_asignacion, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar la asignación:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        logger.info('Asignación actualizada exitosamente', { id });
        return res.json({ message: 'Asignación actualizada exitosamente' });
    });
};

// Función para eliminar una asignación
const deleteAssignment = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Asignaciones WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar la asignación:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        logger.info('Asignación eliminada exitosamente', { id });
        return res.json({ message: 'Asignación eliminada exitosamente' });
    });
};

export { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment };
