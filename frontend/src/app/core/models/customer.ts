export interface CustomerModel {
  id?: number; // Opcional, ya que no se proporciona al crear un nuevo comentario
  nombre: string; // Obligatorio, contenido del comentario
  apellido: string; // Obligatorio, contenido del comentario
  email: string; // Obligatorio, contenido del comentario
  telefono?: string; // Obligatorio, contenido del comentario
  direccion?: string; // Obligatorio, contenido del comentario
  ciudad?: string; // Obligatorio, contenido del comentario
  estado?: string; // Obligatorio, contenido del comentario
  pais?: string; // Obligatorio, contenido del comentario
  fecha_nacimiento?: Date; // Opcional, fecha del comentario, se puede establecer por defecto en la base de datos
  fecha_registro?: Date; // Opcional, fecha del comentario, se puede establecer por defecto en la base de datos
  activo: boolean; // Obligatorio, ID del colaborador que realiza el comentario
}
