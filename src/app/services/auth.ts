import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class Auth {

private apiUrl = 'http://localhost:8080/ms-auth/api/auth/login';

  constructor(private http: HttpClient) {}

  login(credenciales: any): Observable<any>{
    return this.http.post(this.apiUrl, credenciales);
  }

}