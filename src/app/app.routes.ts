import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Medicos } from './pages/medicos/medicos';
import { Pacientes } from './pages/pacientes/pacientes';
import { Citas } from './pages/citas/citas';
import { Reportes } from './pages/reportes/reportes';

export const routes: Routes = [
  { path: '', component: Login },
 { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'medicos', component: Medicos },
      { path: 'pacientes', component: Pacientes },
      { path: 'citas', component: Citas },
      { path: 'reportes', component: Reportes }
    ]
  },
  { path: '**', redirectTo: '' }
];