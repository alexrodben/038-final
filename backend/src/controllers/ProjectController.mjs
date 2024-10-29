import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo proyecto
const createProject = (req, res) => {
    const { nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id } = req.body;

    const query = 'INSERT INTO Proyectos (nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.execute(query, [nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id], (err, results) => {
        if (err) {
            logger.error('Error al crear el proyecto:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Proyecto creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Proyecto creado exitosamente', projectId: results.insertId });
    });
};

// Función para obtener todos los proyectos
const getAllProjects = (req, res) => {
    const query = 'SELECT id, nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id FROM Proyectos';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener proyectos:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un proyecto por su ID
const getProjectById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id FROM Proyectos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el proyecto:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un proyecto
const updateProject = (req, res) => {
    const { id, nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id } = req.body;

    const query = 'UPDATE Proyectos SET nombre = ?, descripcion = ?, cliente = ?, fecha_inicio = ?, fecha_estimacion = ?, estado = ?, responsable_id = ? WHERE id = ?';
    db.execute(query, [nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el proyecto:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Proyecto actualizado exitosamente', { id });
        return res.json({ message: 'Proyecto actualizado exitosamente' });
    });
};

// Función para eliminar un proyecto
const deleteProject = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Proyectos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el proyecto:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        logger.info('Proyecto eliminado exitosamente', { id });
        return res.json({ message: 'Proyecto eliminado exitosamente' });
    });
};

export { createProject, deleteProject, getAllProjects, getProjectById, updateProject };
