import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  
  tiempoRestante: string = '00:00';
  intervaloReloj: any;
  minutosCriticos: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.iniciarReloj();
  }

  ngOnDestroy() {
    if (this.intervaloReloj) {
      clearInterval(this.intervaloReloj);
    }
  }

  iniciarReloj() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const fechaExpiracion = payload.exp * 1000; 

      this.intervaloReloj = setInterval(() => {
        const tiempoActual = new Date().getTime();
        const diferencia = fechaExpiracion - tiempoActual;

        if (diferencia <= 0) {
          clearInterval(this.intervaloReloj);
          this.tiempoRestante = '00:00';
          this.expulsarUsuario();
        } else {
          const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
          const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

          this.tiempoRestante = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
          
          this.minutosCriticos = diferencia < 60000;
        }
      }, 1000);

    } catch (e) {
      console.error('Error al procesar el token');
    }
  }

  expulsarUsuario() {
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Sesión Finalizada',
      text: 'Tu tiempo de sesión ha expirado por seguridad.',
      icon: 'info',
      confirmButtonColor: '#0d3582'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}