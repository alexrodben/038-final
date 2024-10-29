import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user';
import { HttpService } from '../http.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  private baseUrl = `api/users`; // Asegúrate de que BASE_URL esté importado

  getAllUsers(): Observable<any[]> {
    return this.get<UserModel[]>(this.baseUrl); // Utilizando el método get de HttpService
  }

  getUserById(id: number): Observable<any> {
    return this.get<UserModel>(`${this.baseUrl}/${id}`); // Utilizando el método get de HttpService
  }

  createUser(user: any): Observable<any> {
    return this.post<UserModel>(this.baseUrl, user); // Utilizando el método post de HttpService
  }

  updateUser(user: any): Observable<any> {
    return this.put<UserModel>(`${this.baseUrl}/${user.id}`, user); // Utilizando el método put de HttpService
  }

  deleteUser(id: number): Observable<any> {
    return this.delete<UserModel>(`${this.baseUrl}/${id}`); // Utilizando el método delete de HttpService
  }
}
