import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo presupuesto
const createBudget = (req, res) => {
    const { proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda } = req.body;

    const query = 'INSERT INTO Presupuestos (proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda], (err, results) => {
        if (err) {
            logger.error('Error al crear el presupuesto:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Presupuesto creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Presupuesto creado exitosamente', budgetId: results.insertId });
    });
};

// Función para obtener todos los presupuestos
const getAllBudgets = (req, res) => {
    const query = 'SELECT id, proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda FROM Presupuestos';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener presupuestos:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un presupuesto por su ID
const getBudgetById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Presupuestos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el presupuesto:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Presupuesto no encontrado' });
        }
        return res.json(results[0]);
    });
};

// Función para actualizar un presupuesto
const updateBudget = (req, res) => {
    const { id, proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda } = req.body;

    const query = 'UPDATE Presupuestos SET proyecto_id = ?, presupuesto_estimado = ?, gastos_realizados = ?, gastos_pendientes = ?, variacion_presupuestaria = ?, moneda = ? WHERE id = ?';
    db.execute(query, [proyecto_id, presupuesto_estimado, gastos_realizados, gastos_pendientes, variacion_presupuestaria, moneda, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el presupuesto:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Presupuesto no encontrado' });
        }
        logger.info('Presupuesto actualizado exitosamente', { id });
        return res.json({ message: 'Presupuesto actualizado exitosamente' });
    });
};

// Función para eliminar un presupuesto
const deleteBudget = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Presupuestos WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el presupuesto:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Presupuesto no encontrado' });
        }
        logger.info('Presupuesto eliminado exitosamente', { id });
        return res.json({ message: 'Presupuesto eliminado exitosamente' });
    });
};

export { createBudget, deleteBudget, getAllBudgets, getBudgetById, updateBudget };
