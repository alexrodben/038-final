import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {
  private baseUrl = `api/auth`; // Asegúrate de que BASE_URL esté importado

  login(credentials: LoginCredentials): Observable<any> {
    return this.post(`${this.baseUrl}/login`, credentials);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token); // Guardamos el token en localStorage
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
  }

  getProfile(): Observable<any> {
    return this.get(`${this.baseUrl}/profile`);
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}
