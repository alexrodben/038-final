import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear una nueva tarea
const createTask = (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, horas_registradas, proyecto_id, responsable_id, tipo_tarea_id } = req.body;
    const query = 'INSERT INTO Tareas (nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, horas_registradas, proyecto_id, responsable_id, tipo_tarea_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.execute(query, [nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, horas_registradas, proyecto_id, responsable_id, tipo_tarea_id], (err, results) => {
        if (err) {
            logger.error('Error al crear la tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Tarea creada exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Tarea creada exitosamente', taskId: results.insertId });
    });
};

// Función para obtener todas las tareas
const getAllTasks = (req, res) => {
    const query = 'SELECT id, nombre, estado, prioridad, fecha_entrega, responsable_id FROM Tareas';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener tareas:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener una tarea por su ID
const getTaskById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Tareas WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener la tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar una tarea
const updateTask = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, horas_registradas, proyecto_id, responsable_id, tipo_tarea_id } = req.body;
    const query = 'UPDATE Tareas SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_entrega = ?, estado = ?, prioridad = ?, horas_estimadas = ?, horas_registradas = ?, proyecto_id = ?, responsable_id = ?, tipo_tarea_id = ? WHERE id = ?';
    db.execute(query, [nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, horas_registradas, proyecto_id, responsable_id, tipo_tarea_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar la tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        logger.info('Tarea actualizada exitosamente', { id });
        return res.json({ message: 'Tarea actualizada exitosamente' });
    });
};

// Función para eliminar una tarea
const deleteTask = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Tareas WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar la tarea:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        logger.info('Tarea eliminada exitosamente', { id });
        return res.json({ message: 'Tarea eliminada exitosamente' });
    });
};

export { createTask, deleteTask, getAllTasks, getTaskById, updateTask };
