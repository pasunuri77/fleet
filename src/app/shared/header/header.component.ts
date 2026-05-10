import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Fleet Management';
  isSidebarCollapsed = false;
  
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigateByUrl('/login');
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
