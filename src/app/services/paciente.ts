import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Paciente {
  
  private apiUrl = 'http://localhost:8001/api/pacientes';

  constructor(private http: HttpClient) { }

  obtenerPacientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearPaciente(paciente: any): Observable<any> {
    return this.http.post(this.apiUrl, paciente);
  }

  actualizarPaciente(id: number, paciente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, paciente);
  }

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}