import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  
  navItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/vehicles', label: 'Vehicles', icon: 'local_shipping' },
    { path: '/drivers', label: 'Drivers', icon: 'person' }, 
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];

  private sidebarToggleListener?: (event: CustomEvent) => void;

  ngOnInit(): void {
    this.sidebarToggleListener = (event: CustomEvent) => {
      this.isCollapsed = event.detail.isCollapsed;
    };
    
    window.addEventListener('sidebar-toggle', this.sidebarToggleListener as EventListener);
  }

  ngOnDestroy(): void {
    if (this.sidebarToggleListener) {
      window.removeEventListener('sidebar-toggle', this.sidebarToggleListener as EventListener);
    }
  }
}
