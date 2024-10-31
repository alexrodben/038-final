export interface AsignamentModel {
  id?: number; // Opcional, ya que no se proporciona al crear una nueva asignación
  tarea_id: number; // Obligatorio, ID de la tarea asignada
  colaborador_id: number; // Obligatorio, ID del colaborador asignado
  fecha_asignacion: Date; // Obligatorio, fecha de asignación de la tarea
}
