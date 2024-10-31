import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo riesgo
const createRisk = (req, res) => {
    const { descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id } = req.body;
    const query = 'INSERT INTO Riesgos (descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id], (err, results) => {
        if (err) {
            logger.error('Error al crear el riesgo:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Riesgo creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Riesgo creado exitosamente', riskId: results.insertId });
    });
};

// Función para obtener todos los riesgos
const getAllRisks = (req, res) => {
    const query = 'SELECT id, descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id FROM Riesgos';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener riesgos:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un riesgo por su ID
const getRiskById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Riesgos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el riesgo:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Riesgo no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un riesgo
const updateRisk = (req, res) => {
    const { id } = req.params;
    const { descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id } = req.body;
    const query = 'UPDATE Riesgos SET descripcion = ?, probabilidad = ?, impacto = ?, plan_mitigacion = ?, responsable_id = ?, proyecto_id = ? WHERE id = ?';
    db.execute(query, [descripcion, probabilidad, impacto, plan_mitigacion, responsable_id, proyecto_id, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el riesgo:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Riesgo no encontrado' });
        }
        logger.info('Riesgo actualizado exitosamente', { id });
        return res.json({ message: 'Riesgo actualizado exitosamente' });
    });
};

// Función para eliminar un riesgo
const deleteRisk = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Riesgos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el riesgo:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Riesgo no encontrado' });
        }
        logger.info('Riesgo eliminado exitosamente', { id });
        return res.json({ message: 'Riesgo eliminado exitosamente' });
    });
};

export { createRisk, deleteRisk, getAllRisks, getRiskById, updateRisk };
