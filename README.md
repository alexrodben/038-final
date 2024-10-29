# Sistema de Gestión de Proyectos de Desarrollo

Este proyecto consiste en un sistema de gestión de proyectos de desarrollo que implementa una arquitectura de frontend y backend, utilizando una base de datos relacional en MySQL. La aplicación permite gestionar un módulo de maestro-detalle, así como un catálogo asociado, y ofrece un CRUD completo para las entidades definidas.

## Explicación de la Estructura de Base de Datos

-Proyectos: Tabla que almacena la información básica de cada proyecto, incluyendo un campo para el responsable que es una referencia a la tabla Colaboradores.

-Colaboradores: Tabla para gestionar los colaboradores que participan en los proyectos, con campos que describen su rol y estado.

-Tareas: Almacena las tareas asociadas a cada proyecto. Incluye referencias al proyecto y al responsable, así como un campo que relaciona el tipo de tarea a la tabla Tipos_Tarea.

-Tipos_Tarea: Tabla de catálogo que clasifica los tipos de tareas disponibles en el sistema.

-Presupuestos: Permite gestionar el presupuesto de cada proyecto, incluyendo gastos realizados y pendientes.

-Riesgos: Almacena información sobre los riesgos asociados a los proyectos y a quién se le asigna la mitigación de dicho riesgo.

-Documentos: Tabla para gestionar documentos relacionados con los proyectos, permitiendo adjuntar un responsable y un tipo de documento.

-Asignaciones: Permite llevar un control sobre las asignaciones de tareas a diferentes colaboradores, útil para el seguimiento de subtareas.

-Comentarios: Esta tabla facilita la colaboración al permitir comentarios en tareas y documentos por parte de los colaboradores.

## Conclusión

Esta estructura de base de datos está diseñada para ser escalable y flexible, permitiendo que la aplicación de gestión de proyectos de desarrollo sea robusta y capaz de adaptarse a las necesidades cambiantes de los usuarios y los proyectos. Además, facilita la implementación de funcionalidades adicionales como reportes avanzados, análisis de rendimiento y control de cambios en tiempo real.

## Estructura de la Base de Datos

La base de datos se denomina `gestion_proyectos` y contiene las siguientes tablas:

### 1. Proyectos

- **Descripción**: Almacena información básica sobre cada proyecto.
- **Campos**:
  - `id`: Identificador único del proyecto (PK).
  - `nombre`: Nombre del proyecto.
  - `descripcion`: Descripción del proyecto.
  - `cliente`: Nombre del cliente asociado al proyecto.
  - `fecha_inicio`: Fecha de inicio del proyecto.
  - `fecha_estimacion`: Fecha estimada de finalización.
  - `estado`: Estado del proyecto (Ej. En Planificación, En Desarrollo).
  - `responsable_id`: ID del colaborador responsable (FK).

### 2. Colaboradores

- **Descripción**: Gestiona la información de los colaboradores que participan en los proyectos.
- **Campos**:
  - `id`: Identificador único del colaborador (PK).
  - `nombre_completo`: Nombre completo del colaborador.
  - `rol`: Rol del colaborador (Ej. Desarrollador, QA).
  - `email`: Correo electrónico único del colaborador.
  - `telefono`: Número de teléfono del colaborador.
  - `estado`: Estado laboral del colaborador (Ej. Disponible, Ocupado).
  - `horas_semanales`: Horas que trabaja a la semana.

### 3. Tareas

- **Descripción**: Almacena las tareas asociadas a cada proyecto.
- **Campos**:
  - `id`: Identificador único de la tarea (PK).
  - `nombre`: Nombre de la tarea.
  - `descripcion`: Descripción de la tarea.
  - `fecha_inicio`: Fecha de inicio de la tarea.
  - `fecha_entrega`: Fecha de entrega de la tarea.
  - `estado`: Estado de la tarea (Ej. No Iniciada, En Progreso).
  - `prioridad`: Prioridad de la tarea (Ej. Baja, Media, Alta).
  - `horas_estimadas`: Horas estimadas para completar la tarea.
  - `horas_registradas`: Horas ya registradas en la tarea.
  - `proyecto_id`: ID del proyecto asociado (FK).
  - `responsable_id`: ID del colaborador responsable (FK).
  - `tipo_tarea_id`: ID del tipo de tarea (FK).

### 4. Tipos_Tarea

- **Descripción**: Tabla de catálogo que clasifica los tipos de tareas.
- **Campos**:
  - `id`: Identificador único del tipo de tarea (PK).
  - `nombre`: Nombre del tipo de tarea.

### 5. Presupuestos

- **Descripción**: Permite gestionar el presupuesto de cada proyecto.
- **Campos**:
  - `id`: Identificador único del presupuesto (PK).
  - `proyecto_id`: ID del proyecto asociado (FK).
  - `presupuesto_estimado`: Presupuesto estimado para el proyecto.
  - `gastos_realizados`: Gastos ya realizados.
  - `gastos_pendientes`: Gastos que faltan por realizar.
  - `variacion_presupuestaria`: Variación del presupuesto.
  - `moneda`: Moneda utilizada (Ej. USD, GTQ).

### 6. Riesgos

- **Descripción**: Almacena información sobre los riesgos asociados a los proyectos.
- **Campos**:
  - `id`: Identificador único del riesgo (PK).
  - `descripcion`: Descripción del riesgo.
  - `probabilidad`: Probabilidad de ocurrencia (Ej. Baja, Media, Alta).
  - `impacto`: Impacto en caso de ocurrencia (Ej. Bajo, Medio, Alto).
  - `plan_mitigacion`: Plan para mitigar el riesgo.
  - `responsable_id`: ID del colaborador responsable (FK).
  - `proyecto_id`: ID del proyecto asociado (FK).

### 7. Documentos

- **Descripción**: Gestiona documentos relacionados con los proyectos.
- **Campos**:
  - `id`: Identificador único del documento (PK).
  - `nombre`: Nombre del documento.
  - `fecha_creacion`: Fecha de creación del documento.
  - `fecha_actualizacion`: Fecha de última actualización.
  - `colaborador_responsable_id`: ID del colaborador responsable (FK).
  - `tipo_documento`: Tipo de documento (Ej. Especificación, Informe).

### 8. Asignaciones

- **Descripción**: Controla la asignación de tareas a colaboradores.
- **Campos**:
  - `id`: Identificador único de la asignación (PK).
  - `tarea_id`: ID de la tarea asociada (FK).
  - `colaborador_id`: ID del colaborador asignado (FK).
  - `fecha_asignacion`: Fecha de asignación de la tarea.

### 9. Comentarios

- **Descripción**: Permite la colaboración a través de comentarios en tareas y documentos.
- **Campos**:
  - `id`: Identificador único del comentario (PK).
  - `contenido`: Texto del comentario.
  - `fecha_comentario`: Fecha y hora del comentario.
  - `colaborador_id`: ID del colaborador que realiza el comentario (FK).
  - `tarea_id`: ID de la tarea relacionada (FK).
  - `documento_id`: ID del documento relacionado (FK).

## Requerimientos

- MySQL 5.7 o superior.
- Lenguaje de programación backend (Ej. Node.js, ASP.NET).
- Framework frontend (Ej. Angular, React).
- Herramienta para realizar migraciones de base de datos.

## Enlace al Sitio de Pruebas

[Enlace al sitio de pruebas](http://tu-sitio-de-pruebas.com)

## Consideraciones Finales

Este sistema está diseñado para ser robusto y flexible, permitiendo la gestión eficaz de proyectos de desarrollo. Se pueden implementar funcionalidades adicionales según las necesidades del usuario y del entorno de trabajo.
