import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${BASE_URL}/api/auth/login`, credentials);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token); // Guardamos el token en localStorage
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken'); // Recupera el token desde localStorage
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found. User is not logged in.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${BASE_URL}/api/auth/profile`, { headers });
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}
