import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  private apiUrl = 'http://localhost:8080/ms-historial/api/enfermedades';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  registrar(enfermedad: any): Observable<any> {
    return this.http.post(this.apiUrl, enfermedad);
  }

  actualizar(id: number, enfermedad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, enfermedad);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}