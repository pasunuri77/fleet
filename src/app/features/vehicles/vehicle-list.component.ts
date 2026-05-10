import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Vehicle, VehicleService } from '../../core/vehicle.service';
import { Driver, DriverService } from '../../core/drivers.service';
import { DriverTooltipComponent } from '../../shared/driver-tooltip/driver-tooltip.component';
import { VehicleRegistrationModalComponent } from '../../shared/vehicle-registration-modal/vehicle-registration-modal.component';

export interface VehicleWithDriver extends Vehicle {
  driver?: Driver;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, DriverTooltipComponent, VehicleRegistrationModalComponent], // VehicleRegistrationModalComponent used in template for vehicle registration
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
  vehiclesWithDrivers$!: Observable<VehicleWithDriver[]>;
  hoveredDriver: Driver | undefined;

  @ViewChild(VehicleRegistrationModalComponent) vehicleRegistrationModal!: VehicleRegistrationModalComponent;

  constructor(
    private vehicleService: VehicleService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.vehiclesWithDrivers$ = combineLatest([
      this.vehicleService.getVehicles(),
      this.driverService.getDrivers()
    ]).pipe(
      map(([vehicles, drivers]) => {
        return vehicles.map(vehicle => ({
          ...vehicle,
          driver: vehicle.driverId ? drivers.find(d => d.id === vehicle.driverId) : undefined
        }));
      })
    );
  }

  onDriverHover(driver?: Driver): void {
    this.hoveredDriver = driver;
  }

  onDriverLeave(): void {
    this.hoveredDriver = undefined;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Maintenance':
        return 'status-maintenance';
      case 'Inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }

  getVehicleIcon(type: string): string {
    switch (type) {
      case 'Truck':
        return 'local_shipping';
      case 'Van':
        return 'airport_shuttle';
      case 'Car':
        return 'directions_car';
      default:
        return 'directions_car';
    }
  }

  getDriverName(driver?: Driver): string {
    return driver ? driver.name : 'Unassigned';
  }

  openVehicleRegistrationModal(): void {
    this.vehicleRegistrationModal.openModal();
  }
}
