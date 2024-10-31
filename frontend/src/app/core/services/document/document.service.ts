import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentModel } from '../../models/document';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends HttpService {
  private baseUrl = `api/documents`;

  private transformToDocument(data: any): DocumentModel {
    return {
      id: data.id,
      nombre: data.nombre,
      fecha_creacion: data.fecha_creacion,
      fecha_actualizacion: data.fecha_actualizacion,
      colaborador_responsable_id: data.colaborador_responsable_id,
      tipo_documento: data.tipo_documento,
      proyecto_id: data.proyecto_id,
    };
  }

  private mapDocuments(documentData: any[]): DocumentModel[] {
    return documentData.map(this.transformToDocument);
  }

  getAllDocuments(): Observable<DocumentModel[]> {
    return this.get<DocumentModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapDocuments(data))
    );
  }

  getDocumentById(id: string): Observable<DocumentModel> {
    return this.get<DocumentModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToDocument(data))
    );
  }

  createDocument(document: DocumentModel): Observable<any> {
    return this.post<DocumentModel>(this.baseUrl, document);
  }

  updateDocument(id: string, document: DocumentModel): Observable<any> {
    return this.put<DocumentModel>(`${this.baseUrl}/${id}`, document);
  }

  deleteDocument(id: string): Observable<any> {
    return this.delete<DocumentModel>(`${this.baseUrl}/${id}`);
  }
}
