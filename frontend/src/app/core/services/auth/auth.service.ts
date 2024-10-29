import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}
