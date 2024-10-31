export interface BudgetModel {
  id?: number; // Opcional, ya que no se proporciona al crear un nuevo presupuesto
  proyecto_id: number; // Obligatorio, debe estar presente al crear un presupuesto
  presupuesto_estimado: number; // Obligatorio, valor decimal
  gastos_realizados?: number; // Opcional, valor decimal, por defecto 0
  gastos_pendientes?: number; // Opcional, valor decimal, por defecto 0
  variacion_presupuestaria?: number; // Opcional, valor decimal, por defecto 0
  moneda: 'USD' | 'EUR' | 'GTQ'; // Obligatorio, se limita a ciertos valores
}
