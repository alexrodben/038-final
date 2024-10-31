export interface ProjectModel {
  id: string;
  nombre: string;
  descripcion: string;
  cliente: string;
  fechaInicio: Date;
  fechaEstimacion: Date;
  estado:
    | 'En Planificación'
    | 'En Desarrollo'
    | 'En Pruebas'
    | 'Completado'
    | 'Cancelado';
  responsableId: number;
}
