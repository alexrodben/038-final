import connection from './db.mjs';

const seedDatabase = async () => {
    try {
        // Inserciones en Colaboradores
        const insertColaboradores = `
            INSERT INTO Colaboradores (nombre_completo, rol, email, telefono, estado)
            VALUES 
                ('Juan Pérez', 'Desarrollador', 'juan.perez@example.com', '123456789', 'Disponible'),
                ('Ana Gómez', 'QA', 'ana.gomez@example.com', '987654321', 'Ocupado');
        `;
        await new Promise((resolve, reject) => {
            connection.query(insertColaboradores, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Inserciones en Usuarios
        const insertUsuarios = `
                INSERT INTO Usuarios (username, password, rol, estado, colaborador_id)
                VALUES 
                    ('admin', 'admin', 'Admin', 'Activo', NULL),
                    ('juan', 'juan', 'Colaborador', 'Activo', 1),
                    ('ana', 'ana', 'Colaborador', 'Activo', 2),
                    ('gerente', 'gerente', 'Gerente', 'Activo', NULL);
            `;
        await new Promise((resolve, reject) => {
            connection.query(insertUsuarios, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });


        // Inserciones en Proyectos
        const insertProyectos = `
            INSERT INTO Proyectos (nombre, descripcion, cliente, fecha_inicio, fecha_estimacion, estado, responsable_id)
            VALUES 
                ('Proyecto Alpha', 'Descripción del Proyecto Alpha', 'Cliente A', '2024-01-01', '2024-06-01', 'En Desarrollo', 1),
                ('Proyecto Beta', 'Descripción del Proyecto Beta', 'Cliente B', '2024-02-01', '2024-07-01', 'En Planificación', 2);
        `;
        await new Promise((resolve, reject) => {
            connection.query(insertProyectos, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Inserciones en Tipos_Tarea
        const insertTiposTarea = `
            INSERT INTO Tipos_Tarea (nombre)
            VALUES 
                ('Desarrollo'), 
                ('Pruebas');
        `;
        await new Promise((resolve, reject) => {
            connection.query(insertTiposTarea, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Inserciones en Tareas
        const insertTareas = `
            INSERT INTO Tareas (nombre, descripcion, fecha_inicio, fecha_entrega, estado, prioridad, horas_estimadas, proyecto_id, responsable_id, tipo_tarea_id)
            VALUES 
                ('Tarea 1', 'Descripción de Tarea 1', '2024-01-02', '2024-01-10', 'En Progreso', 'Alta', 10, 1, 1, 1),
                ('Tarea 2', 'Descripción de Tarea 2', '2024-01-03', '2024-01-15', 'No Iniciada', 'Media', 5, 2, 2, 2);
        `;
        await new Promise((resolve, reject) => {
            connection.query(insertTareas, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        console.log('Datos insertados exitosamente en las tablas.');
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        connection.end();
    }
};

seedDatabase();
