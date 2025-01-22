import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentModel } from '../../models/comment';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends HttpService {
  private baseUrl = `api/comments`;

  private transformToComment(data: any): CommentModel {
    return {
      id: data.id,
      contenido: data.contenido,
      fecha_comentario: data.fecha_comentario,
      colaborador_id: data.colaborador_id,
      tarea_id: data.tarea_id,
      documento_id: data.documento_id,
    };
  }

  private mapComments(commentData: any[]): CommentModel[] {
    return commentData.map(this.transformToComment);
  }

  getAllComments(): Observable<CommentModel[]> {
    return this.get<CommentModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapComments(data))
    );
  }

  getCommentById(id: string): Observable<CommentModel> {
    return this.get<CommentModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToComment(data))
    );
  }

  createComment(comment: CommentModel): Observable<any> {
    return this.post<CommentModel>(this.baseUrl, comment);
  }

  updateComment(id: string, comment: CommentModel): Observable<any> {
    return this.put<CommentModel>(`${this.baseUrl}/${id}`, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.delete<CommentModel>(`${this.baseUrl}/${id}`);
  }
}
