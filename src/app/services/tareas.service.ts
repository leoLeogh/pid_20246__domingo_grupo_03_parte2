import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private baseUrl = environment.apiUrl;

  private tareas: string = `${this.baseUrl}/tareas`

  constructor(private http: HttpClient) { }

  listarTarea(): Observable<any>{
    return this.http.get(`${this.tareas}`);
  }

  obtenerTarea(id: number): Observable<any>{
    return this.http.get(`${this.tareas}/${id}`);
  }

  registrarTarea(request: any): Observable<any> {
    return this.http.post(`${this.tareas}`, request);
  }

  editarTarea(id: number, request: any): Observable<any>{
    return this.http.put(`${this.tareas}/${id}`, request);
  }

  eliminarTarea(id: number): Observable<any>{
    return this.http.delete(`${this.tareas}/${id}`);
  }

}
