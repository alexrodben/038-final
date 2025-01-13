export interface ProjectModel {
  id?: number;
  nombre: string;
  descripcion: string;
  cliente?: string;
  cliente_id: number;
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
