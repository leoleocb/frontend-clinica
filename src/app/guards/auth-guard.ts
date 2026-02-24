import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const fechaExpiracion = payload.exp * 1000;
      const tiempoActual = Date.now();

      if (tiempoActual >= fechaExpiracion) {
        localStorage.removeItem('token');
        Swal.fire('Sesión Expirada', 'Tu tiempo de sesión ha terminado. Vuelve a ingresar.', 'info');
        router.navigate(['/']);
        return false;
      }

      return true;

    } catch (e) {
      localStorage.removeItem('token');
      router.navigate(['/']);
      return false;
    }
  }

  // Si no hay token en absoluto
  router.navigate(['/']);
  return false;
};