import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskType } from '../../models/taskType';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService extends HttpService {
  private baseUrl = `api/task-types`;

  // Método para transformar los datos de JSON a TaskType
  private transformToTaskType(data: any): TaskType {
    return {
      id: data.id,
      nombre: data.nombre,
    };
  }

  // Transformación para un array de tipos de tarea
  private mapTaskTypes(taskTypeData: any[]): TaskType[] {
    return taskTypeData.map(this.transformToTaskType);
  }

  getAllTaskTypes(): Observable<TaskType[]> {
    return this.get<TaskType[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapTaskTypes(data)) // Aplicamos la transformación aquí
    );
  }

  getTaskTypeById(id: string): Observable<TaskType> {
    return this.get<TaskType>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToTaskType(data)) // Aplicamos la transformación aquí
    );
  }

  createTaskType(taskType: TaskType): Observable<any> {
    return this.post<TaskType>(this.baseUrl, taskType);
  }

  updateTaskType(id: string, taskType: TaskType): Observable<any> {
    return this.put<TaskType>(`${this.baseUrl}/${id}`, taskType);
  }

  deleteTaskType(id: string): Observable<any> {
    return this.delete<TaskType>(`${this.baseUrl}/${id}`);
  }
}
