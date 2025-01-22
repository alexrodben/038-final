import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsignamentModel } from '../../models/asignament';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class AsignamentService extends HttpService {
  private baseUrl = `api/asignaments`;

  private transformToAsignament(data: any): AsignamentModel {
    return {
      id: data.id,
      tarea_id: data.tarea_id,
      colaborador_id: data.colaborador_id,
      fecha_asignacion: data.fecha_asignacion,
    };
  }

  private mapAsignaments(asignamentData: any[]): AsignamentModel[] {
    return asignamentData.map(this.transformToAsignament);
  }

  getAllAsignaments(): Observable<AsignamentModel[]> {
    return this.get<AsignamentModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapAsignaments(data))
    );
  }

  getAsignamentById(id: string): Observable<AsignamentModel> {
    return this.get<AsignamentModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToAsignament(data))
    );
  }

  createAsignament(asignament: AsignamentModel): Observable<any> {
    return this.post<AsignamentModel>(this.baseUrl, asignament);
  }

  updateAsignament(id: string, asignament: AsignamentModel): Observable<any> {
    return this.put<AsignamentModel>(`${this.baseUrl}/${id}`, asignament);
  }

  deleteAsignament(id: string): Observable<any> {
    return this.delete<AsignamentModel>(`${this.baseUrl}/${id}`);
  }
}
