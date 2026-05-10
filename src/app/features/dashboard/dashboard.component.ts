import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/vehicle.service';
import { Charts } from '../../features/charts/charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Charts],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalVehicles = 0;
  activeVehicles = 0;
  maintenanceVehicles = 0;
  inactiveVehicles = 0;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.totalVehicles = this.vehicleService.getTotalVehiclesCount();
    this.activeVehicles = this.vehicleService.getActiveVehiclesCount();
    this.maintenanceVehicles = this.vehicleService.getMaintenanceVehiclesCount();
    this.inactiveVehicles = this.vehicleService.getInactiveVehiclesCount();
  }
}
