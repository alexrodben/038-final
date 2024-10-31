import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo comentario
const createComment = (req, res) => {
    const { contenido, colaborador_id, tarea_id, documento_id } = req.body;
    const query = 'INSERT INTO Comentarios (contenido, colaborador_id, tarea_id, documento_id) VALUES (?, ?, ?, ?)';
    db.execute(query, [contenido, colaborador_id, tarea_id, documento_id], (err, results) => {
        if (err) {
            logger.error('Error al crear el comentario:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Comentario creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Comentario creado exitosamente', commentId: results.insertId });
    });
};

// Función para obtener todos los comentarios
const getAllComments = (req, res) => {
    const query = 'SELECT id, contenido, fecha_comentario, colaborador_id, tarea_id, documento_id FROM Comentarios';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener comentarios:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un comentario por su ID
const getCommentById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Comentarios WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el comentario:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un comentario
const updateComment = (req, res) => {
    const { id } = req.params;
    const { contenido, colaborador_id, tarea_id, documento_id } = req.body;
    const query = 'UPDATE Comentarios SET contenido = ?, colaborador_id = ?, tarea_id = ?, documento_id = ? WHERE id = ?';
    db.execute(query, [contenido, colaborador_id, tarea_id, documento_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el comentario:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        logger.info('Comentario actualizado exitosamente', { id });
        return res.json({ message: 'Comentario actualizado exitosamente' });
    });
};

// Función para eliminar un comentario
const deleteComment = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Comentarios WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el comentario:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        logger.info('Comentario eliminado exitosamente', { id });
        return res.json({ message: 'Comentario eliminado exitosamente' });
    });
};

export { createComment, deleteComment, getAllComments, getCommentById, updateComment };
