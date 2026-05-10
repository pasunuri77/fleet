import { Component, ViewChild } from '@angular/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginModalComponent], // Used in template for login modal
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Fleet Management';
  isSidebarCollapsed = false;
  
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;

  openLoginModal(): void {
    this.loginModal.openModal();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    // Emit event or call service to notify sidebar
    this.notifySidebarToggle();
  }

  private notifySidebarToggle(): void {
    // Simple event dispatch for sidebar to listen
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { isCollapsed: this.isSidebarCollapsed } 
    }));
  }
}
