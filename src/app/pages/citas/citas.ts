import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Cita } from '../../services/cita';
import { Medico } from '../../services/medico';
import { Paciente } from '../../services/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class Citas implements OnInit {

  listaCitas: any[] = [];
  listaMedicos: any[] = [];
  listaPacientes: any[] = [];
  mostrarFormulario: boolean = false;

  citaActual: any = { fecha: '', hora: '', motivo: '', pacienteId: '', medicoId: '' };

  pacienteSeleccionado: any = null;
  medicoSeleccionado: any = null;
  
  mostrarModalPaciente: boolean = false;
  mostrarModalMedico: boolean = false;
  
  textoBusquedaPaciente: string = '';
  textoBusquedaMedico: string = '';

  constructor(private citaService: Cita, private medicoService: Medico, private pacienteService: Paciente) {}

  ngOnInit() {
    this.cargarCitas();
    this.cargarMedicos();
    this.cargarPacientes();
  }

  cargarCitas() { this.citaService.obtenerCitas().subscribe({ next: (d) => this.listaCitas = d }); }
  cargarMedicos() { this.medicoService.obtenerMedicos().subscribe({ next: (d) => this.listaMedicos = d }); }
  cargarPacientes() { this.pacienteService.obtenerPacientes().subscribe({ next: (d) => this.listaPacientes = d }); }

  nuevaCita() {
    this.citaActual = { fecha: '', hora: '', motivo: '', pacienteId: '', medicoId: '' };
    this.pacienteSeleccionado = null;
    this.medicoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  cancelar() { this.mostrarFormulario = false; }

  guardar() {
    if(!this.citaActual.pacienteId || !this.citaActual.medicoId) {
      Swal.fire('Atención', 'Debes seleccionar un paciente y un médico', 'warning');
      return;
    }

    this.citaService.crearCita(this.citaActual).subscribe({
      next: () => {
        Swal.fire('¡Agendada!', 'La cita médica fue registrada con éxito.', 'success');
        this.cargarCitas();
        this.mostrarFormulario = false;
      },
      error: () => Swal.fire('Error', 'No se pudo agendar la cita.', 'error')
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Cancelar Cita?', icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#e74c3c', confirmButtonText: 'Sí, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.eliminarCita(id).subscribe({
          next: () => { Swal.fire('Cancelada', 'La cita ha sido eliminada.', 'success'); this.cargarCitas(); }
        });
      }
    });
  }


  get pacientesFiltrados() {
    const termino = this.textoBusquedaPaciente.toLowerCase();
    return this.listaPacientes.filter(p => {
      const nombre = (p.nombre || '').toLowerCase();
      const dni = (p.numeroIdentificacion || p.numero_identificacion || '').toLowerCase();
      return nombre.includes(termino) || dni.includes(termino);
    });
  }

  // Filtra médicos por Nombre, Apellido o Especialidad
  get medicosFiltrados() {
    const termino = this.textoBusquedaMedico.toLowerCase();
    return this.listaMedicos.filter(m => {
      const nom = (m.nombre || '').toLowerCase();
      const ape = (m.apellido || '').toLowerCase();
      const esp = (m.especialidad || '').toLowerCase();
      return nom.includes(termino) || ape.includes(termino) || esp.includes(termino);
    });
  }

  abrirModalPaciente() { this.mostrarModalPaciente = true; this.textoBusquedaPaciente = ''; }
  abrirModalMedico() { this.mostrarModalMedico = true; this.textoBusquedaMedico = ''; }
  
  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.citaActual.pacienteId = paciente.id;
    this.mostrarModalPaciente = false;
  }

  seleccionarMedico(medico: any) {
    this.medicoSeleccionado = medico;
    this.citaActual.medicoId = medico.id;
    this.mostrarModalMedico = false;
  }
}