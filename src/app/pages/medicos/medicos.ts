import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medico } from '../../services/medico';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css',
})
export class Medicos implements OnInit {

  listaMedicos: any[] = [];
  mostrarFormulario: boolean = false;
  esEdicion: boolean = false;

  medicoActual: any = { nombre: '', apellido: '', especialidad: '', telefono: '' };

  constructor(private medicoService: Medico) { }

  ngOnInit() {
    this.cargarMedicos();
  }

cargarMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (datos) => this.listaMedicos = datos,
      error: (err) => console.error("Error al cargar", err)
    });
  }

  nuevoMedico() {
    this.medicoActual = { nombre: '', apellido: '', especialidad: '', telefono: '' };
    this.esEdicion = false;
    this.mostrarFormulario = true;
  }

 
  editarMedico(medico: any) {
    this.medicoActual = { ...medico }; 
    this.esEdicion = true;
    this.mostrarFormulario = true;
  }


  cancelar() {
    this.mostrarFormulario = false;
  }


  guardar() {
    if (this.esEdicion) {
      this.medicoService.actualizarMedico(this.medicoActual.id, this.medicoActual).subscribe({
        next: () => {
          Swal.fire('¡Actualizado!', 'Los datos del médico se actualizaron.', 'success');
          this.cargarMedicos(); 
          this.mostrarFormulario = false; 
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    } else {
      this.medicoService.crearMedico(this.medicoActual).subscribe({
        next: () => {
          Swal.fire('¡Guardado!', 'El nuevo médico fue registrado.', 'success');
          this.cargarMedicos();
          this.mostrarFormulario = false;
        },
        error: () => Swal.fire('Error', 'No se pudo guardar.', 'error')
      });
    }
  }


  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d3582',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido borrado.', 'success');
            this.cargarMedicos();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        });
      }
    });
  }
}