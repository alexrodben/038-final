import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  private baseUrl = `api/users`; // Asegúrate de que BASE_URL esté importado

  getAllUsers(): Observable<any[]> {
    return this.get<any[]>(this.baseUrl); // Utilizando el método get de HttpService
  }

  getUserById(id: number): Observable<any> {
    return this.get<any>(`${this.baseUrl}/${id}`); // Utilizando el método get de HttpService
  }

  createUser(user: any): Observable<any> {
    return this.post<any>(this.baseUrl, user); // Utilizando el método post de HttpService
  }

  updateUser(user: any): Observable<any> {
    return this.put<any>(`${this.baseUrl}/${user.id}`, user); // Utilizando el método put de HttpService
  }

  deleteUser(id: number): Observable<any> {
    return this.delete<any>(`${this.baseUrl}/${id}`); // Utilizando el método delete de HttpService
  }
}
