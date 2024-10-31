export interface CommentModel {
  id?: number; // Opcional, ya que no se proporciona al crear un nuevo comentario
  contenido: string; // Obligatorio, contenido del comentario
  fecha_comentario?: Date; // Opcional, fecha del comentario, se puede establecer por defecto en la base de datos
  colaborador_id: number; // Obligatorio, ID del colaborador que realiza el comentario
  tarea_id?: number; // Opcional, ID de la tarea asociada al comentario
  documento_id?: number; // Opcional, ID del documento asociado al comentario
}
