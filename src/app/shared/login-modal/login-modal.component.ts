import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  @Output() loginSuccess = new EventEmitter<LoginFormData>();

  isVisible = false;
  formData: LoginFormData = {
    email: '',
    password: ''
  };

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
      console.log('Login attempt:', this.formData);
      // Here you would typically call an authentication service
      this.loginSuccess.emit(this.formData);
      this.closeModal();
    }
  }

  private validateForm(): boolean {
    return this.formData.email.trim() !== '' && this.formData.password.trim() !== '';
  }

  private resetForm(): void {
    this.formData = {
      email: '',
      password: ''
    };
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
