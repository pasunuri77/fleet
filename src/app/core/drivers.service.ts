import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Driver {
    id: number;
    name: string;
    licenseNumber: string;
    status: 'Active' | 'Inactive';
    lastLogin?: string;
    phone?: string;
    email?: string;
    vehicleAssigned?: number;
}

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    private drivers: Driver[] = [
        {
            id: 1,
            name: 'John Smith',
            licenseNumber: 'DL123456789',
            status: 'Active',
            lastLogin: '2024-05-06T08:30:00',
            phone: '+1-555-0101',
            email: 'john.smith@fleet.com',
            vehicleAssigned: 101
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            licenseNumber: 'DL987654321',
            status: 'Active',
            lastLogin: '2024-05-06T07:45:00',
            phone: '+1-555-0102',
            email: 'sarah.johnson@fleet.com',
            vehicleAssigned: 102
        },
        {
            id: 3,
            name: 'Michael Davis',
            licenseNumber: 'DL456789123',
            status: 'Active',
            lastLogin: '2024-05-05T16:20:00',
            phone: '+1-555-0103',
            email: 'michael.davis@fleet.com',
            vehicleAssigned: 103
        },
        {
            id: 4,
            name: 'Emily Wilson',
            licenseNumber: 'DL789123456',
            status: 'Inactive',
            lastLogin: '2024-04-28T14:15:00',
            phone: '+1-555-0104',
            email: 'emily.wilson@fleet.com',
            vehicleAssigned: undefined
        },
        {
            id: 5,
            name: 'Robert Brown',
            licenseNumber: 'DL321654987',
            status: 'Active',
            lastLogin: '2024-05-06T09:00:00',
            phone: '+1-555-0105',
            email: 'robert.brown@fleet.com',
            vehicleAssigned: 104
        },
        {
            id: 6,
            name: 'Jessica Martinez',
            licenseNumber: 'DL654987321',
            status: 'Active',
            lastLogin: '2024-05-05T17:30:00',
            phone: '+1-555-0106',
            email: 'jessica.martinez@fleet.com',
            vehicleAssigned: 105
        },
        {
            id: 7,
            name: 'David Thompson',
            licenseNumber: 'DL147258369',
            status: 'Inactive',
            lastLogin: '2024-04-15T11:45:00',
            phone: '+1-555-0107',
            email: 'david.thompson@fleet.com',
            vehicleAssigned: undefined
        },
        {
            id: 8,
            name: 'Lisa Anderson',
            licenseNumber: 'DL369258147',
            status: 'Active',
            lastLogin: '2024-05-06T06:15:00',
            phone: '+1-555-0108',
            email: 'lisa.anderson@fleet.com',
            vehicleAssigned: 106
        }
    ];

    getDrivers(): Observable<Driver[]> {
        return of(this.drivers);
    }

    getDriverById(id: number): Observable<Driver | undefined> {
        const driver = this.drivers.find(d => d.id === id);
        return of(driver);
    }

    getActiveDrivers(): Observable<Driver[]> {
        const activeDrivers = this.drivers.filter(d => d.status === 'Active');
        return of(activeDrivers);
    }

    getAvailableDrivers(): Observable<Driver[]> {
        const availableDrivers = this.drivers.filter(d => d.status === 'Active' && !d.vehicleAssigned);
        return of(availableDrivers);
    }

    addDriver(driver: Omit<Driver, 'id'>): Observable<Driver> {
        const newDriver: Driver = {
            ...driver,
            id: Math.max(...this.drivers.map(d => d.id)) + 1
        };
        this.drivers.push(newDriver);
        return of(newDriver);
    }

    updateDriver(id: number, updates: Partial<Driver>): Observable<Driver | null> {
        const index = this.drivers.findIndex(d => d.id === id);
        if (index !== -1) {
            this.drivers[index] = { ...this.drivers[index], ...updates };
            return of(this.drivers[index]);
        }
        return of(null);
    }

    deleteDriver(id: number): Observable<boolean> {
        const index = this.drivers.findIndex(d => d.id === id);
        if (index !== -1) {
            this.drivers.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    assignVehicle(driverId: number, vehicleId: number): Observable<Driver | null> {
        const driver = this.drivers.find(d => d.id === driverId);
        if (driver) {
            driver.vehicleAssigned = vehicleId;
            return of(driver);
        }
        return of(null);
    }

    unassignVehicle(driverId: number): Observable<Driver | null> {
        const driver = this.drivers.find(d => d.id === driverId);
        if (driver) {
            driver.vehicleAssigned = undefined;
            return of(driver);
        }
        return of(null);
    }

    getDriverByVehicleId(vehicleId: number): Observable<Driver | undefined> {
        const driver = this.drivers.find(d => d.vehicleAssigned === vehicleId);
        return of(driver);
    }

    getDriversWithVehicles(): Observable<Driver[]> {
        const driversWithVehicles = this.drivers.filter(d => d.vehicleAssigned);
        return of(driversWithVehicles);
    }

    getDriversWithoutVehicles(): Observable<Driver[]> {
        const driversWithoutVehicles = this.drivers.filter(d => !d.vehicleAssigned);
        return of(driversWithoutVehicles);
    }
}
