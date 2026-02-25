import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Medico {
  private apiUrl = 'http://localhost:8080/ms-admin/api/medicos'; 

  constructor(private http: HttpClient) { }

  obtenerMedicos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearMedico(medico: any): Observable<any> {
    return this.http.post(this.apiUrl, medico);
  }


  actualizarMedico(id: number, medico: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, medico);
  }


  eliminarMedico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}