import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EnfermedadService } from '../../services/enfermedad';
@Component({
  selector: 'app-enfermedades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enfermedades.html',
  styleUrl: './enfermedades.css'
})
export class EnfermedadesComponent implements OnInit {

  enfermedades: any[] = [];
  pacientes: any[] = [];
  mostrarFormulario = false;
  
  enfermedadActual: any = {
    nombre: '',
    descripcion: '',
    pacienteId: null
  };

  constructor(
    private enfermedadService: EnfermedadService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarEnfermedades();
    this.cargarPacientes();
  }

  cargarEnfermedades() {
    this.enfermedadService.listar().subscribe(data => {
      this.enfermedades = data;
    });
  }

  // Traemos los pacientes desde ms-admin a través del API Gateway
  cargarPacientes() {
    this.http.get<any[]>('http://localhost:8080/ms-admin/api/pacientes').subscribe(data => {
      this.pacientes = data;
    });
  }

  abrirFormulario(enfermedad: any = null) {
    if (enfermedad) {
      this.enfermedadActual = { ...enfermedad };
    } else {
      this.enfermedadActual = { nombre: '', descripcion: '', pacienteId: null };
    }
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  guardar() {
    if (this.enfermedadActual.id) {
      this.enfermedadService.actualizar(this.enfermedadActual.id, this.enfermedadActual).subscribe(() => {
        Swal.fire('¡Éxito!', 'Historial actualizado correctamente', 'success');
        this.cargarEnfermedades();
        this.cerrarFormulario();
      });
    } else {
      this.enfermedadService.registrar(this.enfermedadActual).subscribe(() => {
        Swal.fire('¡Éxito!', 'Enfermedad registrada al historial', 'success');
        this.cargarEnfermedades();
        this.cerrarFormulario();
      });
    }
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se borrará este registro del historial",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d3582',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enfermedadService.eliminar(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El registro fue borrado.', 'success');
          this.cargarEnfermedades();
        });
      }
    });
  }
}