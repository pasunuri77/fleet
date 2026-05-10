import {
  Component,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { VehicleService } from '../../core/vehicle.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl:'./charts.html',
  styleUrl: './charts.scss'
})
export class Charts implements AfterViewInit, OnDestroy {

  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  loading = true;

  constructor(
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    // Delay to trigger animation properly
    setTimeout(() => {
      this.loading = false;
      this.createCharts();
      this.cdr.detectChanges();
    }, 0);
  }

  createCharts() {
    this.vehicleService.getVehicles().subscribe(vehicles => {

      const trucks = vehicles.filter(v => v.type === 'Truck').length;
      const vans = vehicles.filter(v => v.type === 'Van').length;
      const cars = vehicles.filter(v => v.type === 'Car').length;

      // Destroy old charts
      this.destroyCharts();

      // ✅ PIE CHART
      this.pieChart = new Chart('fleetPieChart', {
        type: 'pie',
        data: {
          labels: ['Trucks', 'Vans', 'Cars'],
          datasets: [{
            data: [trucks, vans, cars],
            backgroundColor: [
              '#3B82F6', // Blue
              '#22C55E', // Green  
              '#F59E0B'  // Orange
            ],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1200,
            easing: 'easeOutQuart'
          }
        }
      });

      // ✅ BAR CHART
      this.barChart = new Chart('fleetBarChart', {
        type: 'bar',
        data: {
          labels: ['Trucks', 'Vans', 'Cars'],
          datasets: [{
            label: 'Vehicles',
            data: [trucks, vans, cars],
            backgroundColor: [
              '#3B82F6', // Blue
              '#22C55E', // Green  
              '#F59E0B'  // Orange
            ],
            borderColor: [
              '#2563EB', // Darker Blue
              '#16A34A', // Darker Green
              '#D97706'  // Darker Orange
            ],
            borderWidth: 2,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1200,
            easing: 'easeOutQuart',
            delay: (ctx) => ctx.dataIndex * 200 // stagger animation
          }
        }
      });
    });
  }

  destroyCharts() {
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }

    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
  }

  ngOnDestroy() {
    this.destroyCharts();
  }
}