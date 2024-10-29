import connection from './db.mjs';

const dropTables = async () => {
    try {
        const tables = [
            'Comentarios',
            'Asignaciones',
            'Documentos',
            'Riesgos',
            'Presupuestos',
            'Tareas',
            'Tipos_Tarea',
            'Proyectos',
            'Usuarios',
            'Colaboradores',
        ];

        for (const table of tables) {
            await new Promise((resolve, reject) => {
                connection.query(`DROP TABLE IF EXISTS ${table};`, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
            console.log(`Tabla ${table} eliminada exitosamente.`);
        }
    } catch (error) {
        console.error('Error al eliminar las tablas:', error);
    } finally {
        connection.end();
    }
};

dropTables();
