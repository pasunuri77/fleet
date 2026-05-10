import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Driver, DriverService } from '../../core/drivers.service';
import { DriverRegistrationModalComponent } from '../../shared/driver-registration-modal/driver-registration-modal.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, DriverRegistrationModalComponent], // DriverRegistrationModalComponent used in template for driver registration modal
  templateUrl: './drivers.html',
  styleUrl: './drivers.scss'
})
export class Drivers implements OnInit {
  drivers$!: Observable<Driver[]>;

  @ViewChild(DriverRegistrationModalComponent) driverRegistrationModal!: DriverRegistrationModalComponent;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.drivers$ = this.driverService.getDrivers();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }

  getDriverIcon(): string {
    return 'person';
  }

  getVehicleAssignment(vehicleAssigned: number | undefined): string {
    return vehicleAssigned ? `Vehicle #${vehicleAssigned}` : 'Unassigned';
  }

  openDriverRegistrationModal(): void {
    this.driverRegistrationModal.openModal();
  }
}
