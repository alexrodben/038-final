import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo documento
const createDocument = (req, res) => {
    const { nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id } = req.body;

    const query = 'INSERT INTO Documentos (nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id], (err, results) => {
        if (err) {
            logger.error('Error al crear el documento:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Documento creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Documento creado exitosamente', documentId: results.insertId });
    });
};

// Función para obtener todos los documentos
const getAllDocuments = (req, res) => {
    const query = 'SELECT id, nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id FROM Documentos';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener documentos:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un documento por su ID
const getDocumentById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Documentos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el documento:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un documento
const updateDocument = (req, res) => {
    const { id, nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id } = req.body;

    const query = 'UPDATE Documentos SET nombre = ?, fecha_creacion = ?, fecha_actualizacion = ?, colaborador_responsable_id = ?, tipo_documento = ?, proyecto_id = ? WHERE id = ?';
    db.execute(query, [nombre, fecha_creacion, fecha_actualizacion, colaborador_responsable_id, tipo_documento, proyecto_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el documento:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        logger.info('Documento actualizado exitosamente', { id });
        return res.json({ message: 'Documento actualizado exitosamente' });
    });
};

// Función para eliminar un documento
const deleteDocument = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Documentos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el documento:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        logger.info('Documento eliminado exitosamente', { id });
        return res.json({ message: 'Documento eliminado exitosamente' });
    });
};

export { createDocument, deleteDocument, getAllDocuments, getDocumentById, updateDocument };
