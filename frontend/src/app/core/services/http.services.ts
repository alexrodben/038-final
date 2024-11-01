import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const BASE_URL: string = 'http://localhost:5000'; // Base URL del servidor

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  protected token: string | null = null;

  constructor(private http: HttpClient) {}

  protected getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken'); // Recupera el token desde localStorage
    }
    return this.token;
  }

  protected createHeaders(additionalHeaders?: {
    [key: string]: string;
  }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });

    if (additionalHeaders) {
      Object.keys(additionalHeaders).forEach((key) => {
        headers = headers.set(key, additionalHeaders[key]);
      });
    }

    return headers;
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = error.error?.message
        ? `Server error: codigo ${error.status} ${error.error.message}`
        : `Server error: codigo ${error.status} ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  protected get<T>(
    url: string,
    additionalHeaders?: { [key: string]: string }
  ): Observable<T> {
    const headers = this.createHeaders(additionalHeaders);
    return this.http
      .get<T>(`${BASE_URL}/${url}`, { headers })
      .pipe(catchError(this.handleError));
  }

  protected post<T>(
    url: string,
    body: any,
    additionalHeaders?: { [key: string]: string }
  ): Observable<T> {
    const headers = this.createHeaders(additionalHeaders);
    return this.http
      .post<T>(`${BASE_URL}/${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  protected put<T>(
    url: string,
    body: any,
    additionalHeaders?: { [key: string]: string }
  ): Observable<T> {
    const headers = this.createHeaders(additionalHeaders);
    return this.http
      .put<T>(`${BASE_URL}/${url}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  protected delete<T>(
    url: string,
    additionalHeaders?: { [key: string]: string }
  ): Observable<T> {
    const headers = this.createHeaders(additionalHeaders);
    return this.http
      .delete<T>(`${BASE_URL}/${url}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
