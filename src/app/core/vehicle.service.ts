import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Vehicle {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
  lastMaintenance?: string;
  driverId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private mockVehicles: Vehicle[] = [
    {
      id: 101,
      name: 'Truck 1',
      type: 'Truck',
      status: 'Active',
      lastMaintenance: '2024-04-15',
      driverId: 1
    },
    {
      id: 102,
      name: 'Van 2',
      type: 'Van',
      status: 'Maintenance',
      lastMaintenance: '2024-05-01',
      driverId: 2
    },
    {
      id: 103,
      name: 'Truck 3',
      type: 'Truck',
      status: 'Active',
      lastMaintenance: '2024-03-20',
      driverId: 3
    },
    {
      id: 104,
      name: 'Car 4',
      type: 'Car',
      status: 'Inactive',
      lastMaintenance: '2024-02-10',
      driverId: 5
    },
    {
      id: 105,
      name: 'Van 5',
      type: 'Van',
      status: 'Active',
      lastMaintenance: '2024-04-25',
      driverId: 6
    },
    {
      id: 106,
      name: 'Car 6',
      type: 'Car',
      status: 'Active',
      lastMaintenance: '2024-04-25',
      driverId: 8
    },
    {
      id: 107,
      name: 'Car 7',
      type: 'Car',
      status: 'Active',
      lastMaintenance: '2024-04-25'
    }
  ];

  getVehicles(): Observable<Vehicle[]> {
    return of(this.mockVehicles);
  }

  getVehicleById(id: number): Observable<Vehicle | undefined> {
    return of(this.mockVehicles.find(vehicle => vehicle.id === id));
  }

  getActiveVehiclesCount(): number {
    return this.mockVehicles.filter(vehicle => vehicle.status === 'Active').length;
  }

  getMaintenanceVehiclesCount(): number {
    return this.mockVehicles.filter(vehicle => vehicle.status === 'Maintenance').length;
  }

  getInactiveVehiclesCount(): number {
    return this.mockVehicles.filter(vehicle => vehicle.status === 'Inactive').length;
  }

  getTotalVehiclesCount(): number {
    return this.mockVehicles.length;
  }

  getVehiclesByDriverId(driverId: number): Observable<Vehicle[]> {
    const vehicles = this.mockVehicles.filter(vehicle => vehicle.driverId === driverId);
    return of(vehicles);
  }

  assignDriver(vehicleId: number, driverId: number): Observable<Vehicle | null> {
    const vehicle = this.mockVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.driverId = driverId;
      return of(vehicle);
    }
    return of(null);
  }

  unassignDriver(vehicleId: number): Observable<Vehicle | null> {
    const vehicle = this.mockVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.driverId = undefined;
      return of(vehicle);
    }
    return of(null);
  }
}
