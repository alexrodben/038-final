export interface RiskModel {
  id?: number; // Opcional, ya que no se proporciona al crear un nuevo riesgo
  descripcion: string; // Obligatorio, descripción del riesgo
  probabilidad: 'Baja' | 'Media' | 'Alta'; // Obligatorio, se limita a ciertos valores
  impacto: 'Bajo' | 'Medio' | 'Alto'; // Obligatorio, se limita a ciertos valores
  plan_mitigacion?: string; // Opcional, plan de mitigación del riesgo
  responsable_id?: number; // Opcional, id del responsable
  proyecto_id: number; // Obligatorio, id del proyecto asociado
}
