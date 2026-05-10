import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DriverFormData {
  name: string;
  licenseNumber: string;
  status: 'Active' | 'Inactive';
  phone?: string;
  email?: string;
  vehicleAssigned?: number;
}

@Component({
  selector: 'app-driver-registration-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-registration-modal.component.html',
  styleUrl: './driver-registration-modal.component.scss'
})
export class DriverRegistrationModalComponent {
  isVisible = false;
  step = 0;
  steps = ['Personal Details', 'Contact Info', 'Review'];

  formData: DriverFormData = {
    name: '',
    licenseNumber: '',
    status: 'Active',
    phone: '',
    email: '',
    vehicleAssigned: undefined
  };

  statusOptions = ['Active', 'Inactive'] as const;

  get isFirstStep(): boolean {
    return this.step === 0;
  }

  get isLastStep(): boolean {
    return this.step === this.steps.length - 1;
  }

  openModal(): void {
    this.isVisible = true;
    this.resetForm();
  }

  closeModal(): void {
    this.isVisible = false;
    this.resetForm();
  }

  onNext(): void {
    if (this.validateCurrentStep()) {
      this.step = Math.min(this.step + 1, this.steps.length - 1);
    }
  }

  onPrevious(): void {
    this.step = Math.max(this.step - 1, 0);
  }

  onSubmit(): void {
    if (!this.isLastStep) {
      this.onNext();
      return;
    }

    if (this.validateForm()) {
      console.log('Driver registration:', this.formData);
      // Here you would typically call a service to add the driver
      this.closeModal();
    }
  }

  private validateCurrentStep(): boolean {
    if (this.step === 0) {
      return this.formData.name.trim() !== '' &&
             this.formData.licenseNumber.trim() !== '' &&
             this.formData.status.trim() !== '';
    }

    return true;
  }

  private validateForm(): boolean {
    return this.formData.name.trim() !== '' && 
           this.formData.licenseNumber.trim() !== '' && 
           this.formData.status.trim() !== '';
  }

  private resetForm(): void {
    this.step = 0;
    this.formData = {
      name: '',
      licenseNumber: '',
      status: 'Active',
      phone: '',
      email: '',
      vehicleAssigned: undefined
    };
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
