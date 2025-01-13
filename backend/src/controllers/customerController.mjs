import db from '../config/db.mjs'; // Importar la conexión a la base de datos
import logger from '../config/logger.mjs'; // Importar el logger

// Función para crear un nuevo cliente
const createCustomer = (req, res) => {
    const { nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento } = req.body;
    const query = 'INSERT INTO Clientes (nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.execute(query, [nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento], (err, results) => {
        if (err) {
            logger.error('Error al crear el cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Cliente creado exitosamente', { id: results.insertId });
        return res.status(201).json({ message: 'Cliente creado exitosamente', customerId: results.insertId });
    });
};

// Función para obtener todos los clientes
const getAllCustomers = (req, res) => {
    const query = 'SELECT id, nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento, fecha_registro, activo FROM Clientes';
    db.execute(query, (err, results) => {
        if (err) {
            logger.error('Error al obtener clientes:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};

// Función para obtener un cliente por su ID
const getCustomerById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento, fecha_registro, activo FROM Clientes WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al obtener el cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.json(results[0]);
    });
}

// Función para actualizar un cliente
const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento } = req.body;
    const query = 'UPDATE Clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, ciudad = ?, estado = ?, pais = ?, fecha_nacimiento = ? WHERE id = ?';
    db.execute(query, [nombre, apellido, email, telefono, direccion, ciudad, estado, pais, fecha_nacimiento, id], (err, results) => {
        if (err) {
            logger.error('Error al actualizar el cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        logger.info('Cliente actualizado exitosamente', { id });
        return res.json({ message: 'Cliente actualizado exitosamente' });
    });
};

// Función para eliminar un cliente
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Clientes WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) {
            logger.error('Error al eliminar el cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        logger.info('Cliente eliminado exitosamente', { id });
        return res.json({ message: 'Cliente eliminado exitosamente' });
    });
};

export { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer };

