export interface DocumentModel {
  id?: number; // Opcional, ya que no se proporciona al crear un nuevo documento
  nombre: string; // Obligatorio, nombre del documento
  fecha_creacion?: Date; // Opcional, fecha de creación del documento
  fecha_actualizacion?: Date; // Opcional, fecha de actualización del documento
  colaborador_responsable_id?: number; // Opcional, id del colaborador responsable
  tipo_documento: 'Especificación' | 'Acta' | 'Informe' | 'Código' | 'Otros'; // Obligatorio, se limita a ciertos valores
  proyecto_id: number; // Obligatorio, id del proyecto asociado
}
