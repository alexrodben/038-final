// createTables.mjs
import connection from './db.mjs';

const createTables = async () => {
    try {
        const tables = [
            `CREATE TABLE IF NOT EXISTS Colaboradores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre_completo VARCHAR(255) NOT NULL,
                rol ENUM('Desarrollador', 'QA', 'Gerente de Proyecto') NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                telefono VARCHAR(20),
                estado ENUM('Disponible', 'Ocupado', 'En Vacaciones') NOT NULL,
                horas_semanales INT DEFAULT 40
            );`,

            `CREATE TABLE IF NOT EXISTS Usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,  -- Asegúrate de almacenar la contraseña de manera segura (ej. hash)
                rol ENUM('Admin', 'Colaborador', 'Gerente') NOT NULL,
                estado ENUM('Activo', 'Inactivo') NOT NULL,
                colaborador_id INT,  -- Columna que puede ser NULL si no hay un colaborador asociado
                FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(id) ON DELETE SET NULL  -- La relación es opcional
            );`,

            `CREATE TABLE IF NOT EXISTS Proyectos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                cliente VARCHAR(255),
                fecha_inicio DATETIME,
                fecha_estimacion DATETIME,
                estado ENUM('En Planificación', 'En Desarrollo', 'En Pruebas', 'Completado', 'Cancelado') NOT NULL,
                responsable_id INT,
                FOREIGN KEY (responsable_id) REFERENCES Colaboradores(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Tipos_Tarea (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL
            );`,

            `CREATE TABLE IF NOT EXISTS Tareas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                fecha_inicio DATETIME,
                fecha_entrega DATETIME,
                estado ENUM('No Iniciada', 'En Progreso', 'En Revisión', 'Completada') NOT NULL,
                prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL,
                horas_estimadas INT,
                horas_registradas INT DEFAULT 0,
                proyecto_id INT,
                responsable_id INT,
                tipo_tarea_id INT,
                FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id),
                FOREIGN KEY (responsable_id) REFERENCES Colaboradores(id),
                FOREIGN KEY (tipo_tarea_id) REFERENCES Tipos_Tarea(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Presupuestos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                proyecto_id INT,
                presupuesto_estimado DECIMAL(10, 2),
                gastos_realizados DECIMAL(10, 2) DEFAULT 0,
                gastos_pendientes DECIMAL(10, 2) DEFAULT 0,
                variacion_presupuestaria DECIMAL(10, 2) DEFAULT 0,
                moneda ENUM('USD', 'EUR', 'GTQ') DEFAULT 'GTQ',
                FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Riesgos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                descripcion TEXT NOT NULL,
                probabilidad ENUM('Baja', 'Media', 'Alta') NOT NULL,
                impacto ENUM('Bajo', 'Medio', 'Alto') NOT NULL,
                plan_mitigacion TEXT,
                responsable_id INT,
                proyecto_id INT,
                FOREIGN KEY (responsable_id) REFERENCES Colaboradores(id),
                FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Documentos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                fecha_creacion DATETIME,
                fecha_actualizacion DATETIME,
                colaborador_responsable_id INT,
                tipo_documento ENUM('Especificación', 'Acta', 'Informe', 'Código', 'Otros') NOT NULL,
                proyecto_id INT,
                FOREIGN KEY (colaborador_responsable_id) REFERENCES Colaboradores(id),
                FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Asignaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tarea_id INT,
                colaborador_id INT,
                fecha_asignacion DATETIME,
                FOREIGN KEY (tarea_id) REFERENCES Tareas(id),
                FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(id)
            );`,

            `CREATE TABLE IF NOT EXISTS Comentarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                contenido TEXT NOT NULL,
                fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
                colaborador_id INT,
                tarea_id INT,
                documento_id INT,
                FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(id),
                FOREIGN KEY (tarea_id) REFERENCES Tareas(id),
                FOREIGN KEY (documento_id) REFERENCES Documentos(id)
            );`
        ];

        // Ejecutar cada consulta por separado
        for (const query of tables) {
            await new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        }

        console.log('Tablas creadas exitosamente.');
    } catch (error) {
        console.error('Error al crear las tablas:', error);
    } finally {
        connection.end();
    }
};

createTables();
