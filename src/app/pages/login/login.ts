import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  credenciales = {
    username: '',
    password: ''
  };

  errorLogin: boolean = false;



  constructor(private auth: Auth, private router: Router ) {}

  ingresar() {
  
    this.errorLogin = false; 

    this.auth.login(this.credenciales).subscribe({
      next: (respuesta) => {

        localStorage.setItem('token', respuesta.token);
        
        Swal.fire({
          icon: 'success',
          title: '¡Acceso Concedido!',
          text: 'Bienvenido al sistema de Medical Care',
          confirmButtonColor: '#0d3582', 
          timer: 1500,
          showConfirmButton: false 
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (error) => {
       
        this.errorLogin = true;

       
        Swal.fire({
          icon: 'error',
          title: 'Error de Autenticación',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonColor: '#e74c3c' 
        });
      }
    });
  }

}
