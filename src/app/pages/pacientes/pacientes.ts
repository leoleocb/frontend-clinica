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

  pacienteActual: any = { 
    nombres: '', 
    apellidoPaterno: '', 
    apellidoMaterno: '', 
    numeroIdentificacion: '', 
    fechaNacimiento: '',
    telefono: '',
    direccion: ''
  };

  constructor(private pacienteService: Paciente) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (datos) => this.listaPacientes = datos,
      error: (err) => console.error("Error al cargar pacientes", err)
    });
  }

  nuevoPaciente() {
    this.pacienteActual = { nombres: '', apellidoPaterno: '', apellidoMaterno: '', numeroIdentificacion: '', fechaNacimiento: '', telefono: '', direccion: '' };
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
    if (!this.pacienteActual.nombres || !this.pacienteActual.apellidoPaterno || 
        !this.pacienteActual.apellidoMaterno || !this.pacienteActual.numeroIdentificacion || 
        !this.pacienteActual.fechaNacimiento) {
      Swal.fire('Atención', 'Por favor, completa todos los campos obligatorios (Nombres, Apellidos, DNI y Fecha).', 'warning');
      return;
    }

    // 2. Validar que nombres y apellidos SOLO contengan letras y espacios
    // Esta fórmula matemática (Regex) acepta letras mayúsculas, minúsculas, tildes y la letra ñ
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    if (!regexLetras.test(this.pacienteActual.nombres) || 
        !regexLetras.test(this.pacienteActual.apellidoPaterno) || 
        !regexLetras.test(this.pacienteActual.apellidoMaterno)) {
      Swal.fire('Formato Inválido', 'Los nombres y apellidos solo deben contener letras.', 'error');
      return;
    }

    // 3. Validar DNI (Solo números y exactamente 8 dígitos)
    const regexNumeros = /^[0-9]+$/;
    
    if (!regexNumeros.test(this.pacienteActual.numeroIdentificacion) || this.pacienteActual.numeroIdentificacion.length !== 8) {
      Swal.fire('DNI Inválido', 'El número de identificación debe tener exactamente 8 números.', 'error');
      return;
    }

    if (this.pacienteActual.telefono) {
      if (!regexNumeros.test(this.pacienteActual.telefono) || this.pacienteActual.telefono.length !== 9) {
        Swal.fire('Teléfono Inválido', 'El número de celular debe tener exactamente 9 dígitos numéricos.', 'error');
        return;
      }
    }

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