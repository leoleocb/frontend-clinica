import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Medicos } from './pages/medicos/medicos';
import { Pacientes } from './pages/pacientes/pacientes';
import { Citas } from './pages/citas/citas';
import { Reportes } from './pages/reportes/reportes';
import { Inicio } from './pages/inicio/inicio';
import { EnfermedadesComponent } from './pages/enfermedades/enfermedades';
export const routes: Routes = [
  { path: '', component: Login },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: Inicio }, 
      { path: 'medicos', component: Medicos },
      { path: 'pacientes', component: Pacientes },
      { path: 'citas', component: Citas },
      { path: 'reportes', component: Reportes },
      { path: 'enfermedades', component: EnfermedadesComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];