import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  ingresar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  registrar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
