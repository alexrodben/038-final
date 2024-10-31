import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskModel } from '../../models/task';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends HttpService {
  private baseUrl = `api/tasks`;

  private transformToTask(data: any): TaskModel {
    return {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      fecha_inicio: new Date(data.fecha_inicio),
      fecha_entrega: new Date(data.fecha_entrega),
      estado: data.estado,
      prioridad: data.prioridad,
      horas_estimadas: data.horas_estimadas,
      horas_registradas: data.horas_registradas,
      proyecto_id: data.proyecto_id,
      responsable_id: data.responsable_id,
      tipo_tarea_id: data.tipo_tarea_id,
    };
  }

  private mapTasks(taskData: any[]): TaskModel[] {
    return taskData.map(this.transformToTask);
  }

  getAllTasks(): Observable<TaskModel[]> {
    return this.get<TaskModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapTasks(data))
    );
  }

  getTaskById(id: string): Observable<TaskModel> {
    return this.get<TaskModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToTask(data))
    );
  }

  createTask(task: TaskModel): Observable<any> {
    return this.post<TaskModel>(this.baseUrl, task);
  }

  updateTask(id: string, task: TaskModel): Observable<any> {
    return this.put<TaskModel>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.delete<TaskModel>(`${this.baseUrl}/${id}`);
  }
}
