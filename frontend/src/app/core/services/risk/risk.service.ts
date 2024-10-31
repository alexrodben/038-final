import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RiskModel } from '../../models/risk';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class RiskService extends HttpService {
  private baseUrl = `api/risks`;

  private transformToRisk(data: any): RiskModel {
    return {
      id: data.id,
      descripcion: data.descripcion,
      probabilidad: data.probabilidad,
      impacto: data.impacto,
      plan_mitigacion: data.plan_mitigacion,
      responsable_id: data.responsable_id,
      proyecto_id: data.proyecto_id,
    };
  }

  private mapRisks(riskData: any[]): RiskModel[] {
    return riskData.map(this.transformToRisk);
  }

  getAllRisks(): Observable<RiskModel[]> {
    return this.get<RiskModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapRisks(data))
    );
  }

  getRiskById(id: string): Observable<RiskModel> {
    return this.get<RiskModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToRisk(data))
    );
  }

  createRisk(risk: RiskModel): Observable<any> {
    return this.post<RiskModel>(this.baseUrl, risk);
  }

  updateRisk(id: string, risk: RiskModel): Observable<any> {
    return this.put<RiskModel>(`${this.baseUrl}/${id}`, risk);
  }

  deleteRisk(id: string): Observable<any> {
    return this.delete<RiskModel>(`${this.baseUrl}/${id}`);
  }
}
