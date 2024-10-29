import connection from './db.mjs';

// Crear y poblar tablas
const seedDatabase = async () => {
    try {
        // Crear tablas
        const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

        // Ejecutar consulta para crear las tablas
        await new Promise((resolve, reject) => {
            connection.query(createTablesQuery, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        console.log('Tablas creadas exitosamente.');

        // Insertar datos iniciales en las tablas
        const seedDataQuery = `
      INSERT INTO users (username, password, email)
      VALUES 
        ('user1', 'password1', 'user1@example.com'),
        ('user2', 'password2', 'user2@example.com');

      INSERT INTO posts (user_id, title, content)
      VALUES 
        (1, 'First Post', 'This is the first post content.'),
        (2, 'Second Post', 'This is the second post content.');
    `;

        // Ejecutar consulta para poblar las tablas
        await new Promise((resolve, reject) => {
            connection.query(seedDataQuery, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        console.log('Datos insertados exitosamente en las tablas.');
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        // Cerrar la conexión
        connection.end();
    }
};

// Ejecutar el script de seed
seedDatabase();
