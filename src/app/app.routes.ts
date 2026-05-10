import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { VehicleListComponent } from './features/vehicles/vehicle-list.component';
import { Settings } from './features/settings/settings';
import { Drivers } from './features/drivers/drivers';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'settings', component: Settings },
  { path: 'drivers', component: Drivers },
  { path: '**', redirectTo: '/dashboard' }
];
