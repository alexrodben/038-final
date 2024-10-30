export interface UserModel {
  id: number;
  username: string;
  password?: string;
  rol: 'Admin' | 'Colaborador' | 'Gerente';
  estado: 'Activo' | 'Inactivo';
  colaborador_id: any;
}
