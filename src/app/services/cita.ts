import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cita {
  

  private apiUrl = 'http://localhost:8080/ms-clinica/api/citas';

  constructor(private http: HttpClient) { }

  obtenerCitas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearCita(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }

  eliminarCita(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

  marcarComoAtendida(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado`, {});
  }
}