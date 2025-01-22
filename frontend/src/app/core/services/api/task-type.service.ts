import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskTypeModel } from '../../models/taskType';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService extends HttpService {
  private baseUrl = `api/task-types`;

  // Método para transformar los datos de JSON a TaskTypeModel
  private transformToTaskType(data: any): TaskTypeModel {
    return {
      id: data.id,
      nombre: data.nombre,
    };
  }

  // Transformación para un array de tipos de tarea
  private mapTaskTypes(taskTypeData: any[]): TaskTypeModel[] {
    return taskTypeData.map(this.transformToTaskType);
  }

  getAllTaskTypes(): Observable<TaskTypeModel[]> {
    return this.get<TaskTypeModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapTaskTypes(data)) // Aplicamos la transformación aquí
    );
  }

  getTaskTypeById(id: string): Observable<TaskTypeModel> {
    return this.get<TaskTypeModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToTaskType(data)) // Aplicamos la transformación aquí
    );
  }

  createTaskType(taskType: TaskTypeModel): Observable<any> {
    return this.post<TaskTypeModel>(this.baseUrl, taskType);
  }

  updateTaskType(id: string, taskType: TaskTypeModel): Observable<any> {
    return this.put<TaskTypeModel>(`${this.baseUrl}/${id}`, taskType);
  }

  deleteTaskType(id: string): Observable<any> {
    return this.delete<TaskTypeModel>(`${this.baseUrl}/${id}`);
  }
}
