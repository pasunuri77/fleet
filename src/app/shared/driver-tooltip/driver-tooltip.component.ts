import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver } from '../../core/drivers.service';

@Component({
  selector: 'app-driver-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-tooltip.component.html',
  styleUrl: './driver-tooltip.component.scss'
})
export class DriverTooltipComponent {
  @Input() driver?: Driver;
  
  constructor() { }

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
}
