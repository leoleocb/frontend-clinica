import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  const token = localStorage.getItem('token'); 

 
  let peticion = req;
  if (token) {
    peticion = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(peticion).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('token');
        
        Swal.fire('Sesión Expirada', 'Por seguridad, tu sesión ha terminado. Vuelve a ingresar.', 'warning').then(() => {
          router.navigate(['/']);
        });
      }
      return throwError(() => error);
    })
  );
};