import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Paciente } from '../../services/paciente';
import { Medico } from '../../services/medico';
import { Cita } from '../../services/cita';

@Component({
  selector: 'app-inicio',
  standalone: true,

  imports: [RouterModule, ], 
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {

  totalPacientes: number = 0;
  totalMedicos: number = 0;
  totalCitas: number = 0;
  

  fechaHoy: Date = new Date();

  constructor(
    private pacienteService: Paciente,
    private medicoService: Medico,
    private citaService: Cita
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (datos) => this.totalPacientes = datos.length
    });

    this.medicoService.obtenerMedicos().subscribe({
      next: (datos) => this.totalMedicos = datos.length
    });

    this.citaService.obtenerCitas().subscribe({
      next: (datos) => this.totalCitas = datos.length
    });
  }
}