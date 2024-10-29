import connection from './db.mjs';

const databaseName = process.env.DB_NAME;

// Comando para eliminar y crear la base de datos
const resetDatabase = `
    DROP DATABASE IF EXISTS ${databaseName};
    CREATE DATABASE ${databaseName};
`;

connection.query(resetDatabase, (err) => {
    if (err) {
        console.error('Error al resetear la base de datos:', err);
        return;
    }
    console.log(`Base de datos '${databaseName}' reseteada exitosamente.`);
    connection.end();
});
