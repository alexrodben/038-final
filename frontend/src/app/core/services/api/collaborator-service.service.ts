import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollaboratorModel } from '../../models/collaborator';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService extends HttpService {
  private baseUrl = `api/collaborators`; // Cambia a la URL específica de colaboradores

  // Obtener todos los colaboradores
  getAllCollaborators(): Observable<CollaboratorModel[]> {
    return this.get<CollaboratorModel[]>(this.baseUrl); // Método get de HttpService
  }

  // Obtener colaborador por ID
  getCollaboratorById(id: string): Observable<CollaboratorModel> {
    return this.get<CollaboratorModel>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo colaborador
  createCollaborator(
    collaborator: CollaboratorModel
  ): Observable<CollaboratorModel> {
    return this.post<CollaboratorModel>(this.baseUrl, collaborator);
  }

  // Actualizar un colaborador existente
  updateCollaborator(
    collaborator: CollaboratorModel
  ): Observable<CollaboratorModel> {
    return this.put<CollaboratorModel>(
      `${this.baseUrl}/${collaborator.id}`,
      collaborator
    );
  }

  // Eliminar colaborador por ID
  deleteCollaborator(id: string): Observable<any> {
    return this.delete<CollaboratorModel>(`${this.baseUrl}/${id}`);
  }
}
