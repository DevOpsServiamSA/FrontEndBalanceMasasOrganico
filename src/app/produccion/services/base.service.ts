import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl = environment.apiUrl + '/api/ConsumoProveedor';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Aquí puedes agregar la lógica para incluir el token de autorización si es necesario
    });
    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  public get(url: string, authorized: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    // Si necesitas autorización, puedes agregar el token de autorización aquí
    return this.http.get(`${this.baseUrl}${url}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public post(url: string, data: any, authorized: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    // Si necesitas autorización, puedes agregar el token de autorización aquí
    return this.http.post(`${this.baseUrl}${url}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public put(url: string, data: any, authorized: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    // Si necesitas autorización, puedes agregar el token de autorización aquí
    return this.http.put(`${this.baseUrl}${url}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public delete(url: string, authorized: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    // Si necesitas autorización, puedes agregar el token de autorización aquí
    return this.http.delete(`${this.baseUrl}${url}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public postFiles(url: string, data: FormData, authorized: boolean = true): Observable<any> {
    const headers = new HttpHeaders({
        // Aquí no es necesario especificar el Content-Type para multipart/form-data
        // HttpClient se encargará de establecerlo correctamente        
    });
    return this.http.post(`${this.baseUrl}${url}`, data, 
      { 
        headers, 
        reportProgress: true, 
        observe: 'events' 
      }).pipe(
      catchError(this.handleError)
  );
  }
}
