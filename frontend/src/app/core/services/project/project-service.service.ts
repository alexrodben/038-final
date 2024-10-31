import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../../models/project';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends HttpService {
  private baseUrl = `api/projects`;

  // Método para transformar los datos de JSON a ProjectModel
  private transformToProjectModel(data: any): ProjectModel {
    return {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      cliente: data.cliente,
      fecha_inicio: new Date(data.fecha_inicio), // Convertir a Date
      fecha_estimacion: new Date(data.fecha_estimacion), // Convertir a Date
      estado: data.estado,
      responsable_id: data.responsable_id,
    };
  }

  // Transformación para un array de proyectos
  private mapProjects(projectData: any[]): ProjectModel[] {
    return projectData.map(this.transformToProjectModel);
  }

  getAllProjects(): Observable<ProjectModel[]> {
    return this.get<ProjectModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapProjects(data)) // Aplicamos la transformación aquí
    );
  }

  getProjectById(id: string): Observable<ProjectModel> {
    return this.get<ProjectModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToProjectModel(data)) // Aplicamos la transformación aquí
    );
  }

  createProject(project: ProjectModel): Observable<any> {
    return this.post<ProjectModel>(this.baseUrl, project);
  }

  updateProject(id: string, project: ProjectModel): Observable<any> {
    return this.put<ProjectModel>(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.delete<ProjectModel>(`${this.baseUrl}/${id}`);
  }
}
