import { Component } from '@angular/core';
import { Reporte } from '../../services/reporte';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class Reportes {

  cargando: boolean = false;

  constructor(private reporteService: Reporte) {}

  generarReporteCitas() {
    this.cargando = true;
    
    this.reporteService.descargarReporteCitas().subscribe({
      next: (archivoBlob) => {
        const url = window.URL.createObjectURL(archivoBlob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = `Reporte_Citas_${new Date().getTime()}.pdf`;
        enlace.click();
        window.URL.revokeObjectURL(url);
        
        this.cargando = false;
        Swal.fire('¡Éxito!', 'El reporte se ha descargado correctamente.', 'success');
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        Swal.fire('Error', 'No se pudo generar el reporte. Verifica el microservicio.', 'error');
      }
    });
  }
}