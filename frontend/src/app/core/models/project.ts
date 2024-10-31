export interface ProjectModel {
  id?: string;
  nombre: string;
  descripcion: string;
  cliente: string;
  fecha_inicio: Date;
  fecha_estimacion: Date;
  estado:
    | 'En Planificación'
    | 'En Desarrollo'
    | 'En Pruebas'
    | 'Completado'
    | 'Cancelado';
  responsable_id: number;
}
