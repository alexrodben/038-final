import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${BASE_URL}/api/login`, credentials); // Cambiado a URL completa

    return this.http.post('/api/login', credentials);
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}
