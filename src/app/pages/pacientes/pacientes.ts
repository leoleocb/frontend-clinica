import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Paciente } from '../../services/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.css']
})
export class Pacientes implements OnInit {

  listaPacientes: any[] = [];
  mostrarFormulario: boolean = false;
  esEdicion: boolean = false;

  pacienteActual: any = { nombre: '', numeroIdentificacion: '', fechaNacimiento: '' };

  constructor(private pacienteService: Paciente) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (datos) => {
        this.listaPacientes = datos;
        console.log("Pacientes recibidos:", datos);
      },
      error: (err) => console.error("Error al cargar pacientes", err)
    });
  }

  nuevoPaciente() {
    this.pacienteActual = { nombre: '', numeroIdentificacion: '', fechaNacimiento: '' };
    this.esEdicion = false;
    this.mostrarFormulario = true;
  }

  editarPaciente(paciente: any) {
    this.pacienteActual = { ...paciente };
    this.esEdicion = true;
    this.mostrarFormulario = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
  }

  guardar() {
    if (this.esEdicion) {
      this.pacienteService.actualizarPaciente(this.pacienteActual.id, this.pacienteActual).subscribe({
        next: () => {
          Swal.fire('¡Actualizado!', 'Los datos del paciente se actualizaron.', 'success');
          this.cargarPacientes();
          this.mostrarFormulario = false;
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    } else {
      this.pacienteService.crearPaciente(this.pacienteActual).subscribe({
        next: () => {
          Swal.fire('¡Guardado!', 'El nuevo paciente fue registrado.', 'success');
          this.cargarPacientes();
          this.mostrarFormulario = false;
        },
        error: () => Swal.fire('Error', 'No se pudo guardar.', 'error')
      });
    }
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Eliminarás el registro de este paciente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d3582',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido borrado.', 'success');
            this.cargarPacientes();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        });
      }
    });
  }
}