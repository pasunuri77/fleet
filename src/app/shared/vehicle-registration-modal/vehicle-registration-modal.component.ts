import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VehicleFormData {
  name: string;
  type: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
  lastMaintenance?: string;
  driverId?: number;
}

@Component({
  selector: 'app-vehicle-registration-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-registration-modal.component.html',
  styleUrl: './vehicle-registration-modal.component.scss'
})
export class VehicleRegistrationModalComponent {
  isVisible = false;
  formData: VehicleFormData = {
    name: '',
    type: '',
    status: 'Active',
    lastMaintenance: '',
    driverId: undefined
  };

  vehicleTypes = ['Truck', 'Van', 'Car'];
  statusOptions = ['Active', 'Maintenance', 'Inactive'] as const;

  openModal(): void {
    this.isVisible = true;
    this.resetForm();
  }

  closeModal(): void {
    this.isVisible = false;
    this.resetForm();
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Vehicle registration:', this.formData);
      // Here you would typically call a service to add the vehicle
      this.closeModal();
    }
  }

  private validateForm(): boolean {
    return this.formData.name.trim() !== '' && 
           this.formData.type.trim() !== '' && 
           this.formData.status.trim() !== '';
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      type: '',
      status: 'Active',
      lastMaintenance: '',
      driverId: undefined
    };
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
