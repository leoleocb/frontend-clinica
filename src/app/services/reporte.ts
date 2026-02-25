import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reporte {
  
  private apiUrl = 'http://localhost:8080/ms-reportes/api/reportes';


  constructor(private http: HttpClient) { }

descargarReporteCitas(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/citas-pdf`, { responseType: 'blob' });
  }
}