export interface TaskModel {
  id?: number; // Opcional, ya que no se proporciona al crear una nueva tarea
  nombre: string; // Obligatorio
  descripcion?: string; // Opcional
  fecha_inicio: Date; // Opcional
  fecha_entrega: Date; // Opcional
  estado: 'No Iniciada' | 'En Progreso' | 'En Revisión' | 'Completada'; // Obligatorio
  prioridad: 'Baja' | 'Media' | 'Alta'; // Obligatorio
  horas_estimadas?: number; // Opcional
  horas_registradas?: number; // Opcional, por defecto 0
  proyecto_id: number; // Opcional, puede no estar presente en la creación
  responsable_id: number; // Opcional, puede no estar presente en la creación
  tipo_tarea_id: number; // Opcional, puede no estar presente en la creación
}
