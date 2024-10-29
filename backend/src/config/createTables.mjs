// createTables.js
import connection from './db.mjs';

// Crear tabla de ejemplo
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`;

// Ejecutar las consultas para crear tablas
connection.query(createUsersTable, (err, result) => {
    if (err) {
        console.error('Error al crear la tabla users:', err);
        return;
    }
    console.log('Tabla users creada o ya existía');
});

connection.query(createPostsTable, (err, result) => {
    if (err) {
        console.error('Error al crear la tabla posts:', err);
        return;
    }
    console.log('Tabla posts creada o ya existía');
});

// Cerrar la conexión una vez que se hayan creado las tablas
connection.end();
