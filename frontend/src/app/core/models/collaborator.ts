export interface CollaboratorModel {
  id: number;
  nombre_completo: string;
  rol: 'Desarrollador' | 'QA' | 'Gerente de Proyecto';
  email: string;
  telefono?: string;
  estado: 'Disponible' | 'Ocupado' | 'En Vacaciones';
  horas_semanales?: number;
}
