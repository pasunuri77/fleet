import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list.component';
import { Settings } from './features/settings/settings';
import { Drivers } from './features/drivers/drivers';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'settings', component: Settings },
  { path: 'drivers', component: Drivers },
  { path: '**', redirectTo: '/login' }
];
