import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetModel } from '../../models/budget';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class BudgetService extends HttpService {
  private baseUrl = `api/budgets`;

  private transformToBudget(data: any): BudgetModel {
    return {
      id: data.id,
      proyecto_id: data.proyecto_id,
      presupuesto_estimado: data.presupuesto_estimado,
      gastos_realizados: data.gastos_realizados,
      gastos_pendientes: data.gastos_pendientes,
      variacion_presupuestaria: data.variacion_presupuestaria,
      moneda: data.moneda,
    };
  }

  private mapBudgets(budgetData: any[]): BudgetModel[] {
    return budgetData.map(this.transformToBudget);
  }

  getAllBudgets(): Observable<BudgetModel[]> {
    return this.get<BudgetModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapBudgets(data))
    );
  }

  getBudgetById(id: string): Observable<BudgetModel> {
    return this.get<BudgetModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToBudget(data))
    );
  }

  createBudget(budget: BudgetModel): Observable<any> {
    return this.post<BudgetModel>(this.baseUrl, budget);
  }

  updateBudget(id: string, budget: BudgetModel): Observable<any> {
    return this.put<BudgetModel>(`${this.baseUrl}/${id}`, budget);
  }

  deleteBudget(id: string): Observable<any> {
    return this.delete<BudgetModel>(`${this.baseUrl}/${id}`);
  }
}
