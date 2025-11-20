import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ParkingSpot {
  id: number;
  name: string;
  x: number;
  y: number;
}

interface Vehicle {
  id: number;
  plate: string;
  route: string;
  driver?: string;
  parkingSpotId?: number | null;
}

@Component({
  selector: 'app-vehicle-parking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ps-2 pe-5">
      <h2>Vị trí đỗ xe</h2>

      <!-- vehicle selector -->
      <div class="row">
        <label for="vehicleSelect">Chọn phương tiện:</label>
        <select
          id="vehicleSelect"
          [(ngModel)]="selectedVehicleId"
          (ngModelChange)="onVehicleChange($event)"
        >
          <option *ngFor="let v of vehicles" [ngValue]="v.id">
            {{ v.plate }} — {{ v.route }}
            {{ v.driver ? '(' + v.driver + ')' : '' }}
          </option>
        </select>
      </div>

      <div class="info">
        <p><strong>Biển số:</strong> {{ currentVehicle?.plate || '—' }}</p>
        <p><strong>Tuyến:</strong> {{ currentVehicle?.route || '—' }}</p>
        <p>
          <strong>Vị trí hiện tại:</strong>
          <span *ngIf="currentVehicle?.parkingSpotId">
            {{ spotById(currentVehicle!.parkingSpotId)?.name }}
          </span>
          <span *ngIf="!currentVehicle?.parkingSpotId">Chưa gán</span>
        </p>
      </div>

      <div class="map-wrapper">
        <svg
          width="420"
          height="320"
          style="border:1px solid #ccc; background:#f9f9f9"
        >
          <!-- parking spots -->
          <ng-container *ngFor="let spot of parkingSpots">
            <rect
              [attr.x]="spot.x - rectSize / 2"
              [attr.y]="spot.y - rectSize / 2"
              [attr.width]="rectSize"
              [attr.height]="rectSize"
              rx="6"
              class="spot"
              [class.current]="currentVehicle?.parkingSpotId === spot.id"
              [class.selected]="selectedSpotId === spot.id"
              (click)="clickSpot(spot)"
            ></rect>

            <text
              [attr.x]="spot.x"
              [attr.y]="spot.y + 5"
              text-anchor="middle"
              font-size="12"
              fill="#000"
            >
              {{ spot.name }}
            </text>
          </ng-container>

          <!-- marker for saved/current (small circle) -->
          <ng-container *ngIf="currentVehicle?.parkingSpotId">
            <circle
              [attr.cx]="spotById(currentVehicle!.parkingSpotId)!.x"
              [attr.cy]="
                spotById(currentVehicle!.parkingSpotId)!.y - rectSize / 2 - 8
              "
              r="8"
              class="marker-saved"
            ></circle>
          </ng-container>

          <!-- marker for newly selected (larger semi-transparent) -->
          <ng-container *ngIf="selectedSpotId !== null">
            <circle
              [attr.cx]="spotById(selectedSpotId)!.x"
              [attr.cy]="spotById(selectedSpotId)!.y - rectSize / 2 - 8"
              r="12"
              class="marker-selected"
            ></circle>
          </ng-container>
        </svg>
      </div>

      <div class="actions">
        <button (click)="saveSelected()" [disabled]="!canSave()">Lưu</button>
        <button (click)="cancelSelection()" [disabled]="!hasSelection()">
          Hủy
        </button>
        <button
          (click)="clearCurrent()"
          class="danger"
          [disabled]="!currentVehicle?.parkingSpotId"
        >
          Xóa vị trí
        </button>
      </div>

      <div class="note">
        <small
          >Click một ô để chọn vị trí. Nhấn <strong>Lưu</strong> để gán vị trí
          cho phương tiện đã chọn.</small
        >
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        font-family: Roboto, Arial, sans-serif;
        max-width: 700px;
      }
      .row {
        margin: 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      label {
        min-width: 120px;
      }
      select {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
      }
      .info p {
        margin: 6px 0;
      }
      .map-wrapper {
        margin-top: 12px;
        display: flex;
        justify-content: center;
      }
      .spot {
        fill: #fff;
        stroke: #b6c2cc;
        cursor: pointer;
      }
      .spot.current {
        fill: #e6f7ff;
        stroke: #1f6feb;
        stroke-width: 2;
      }
      .spot.selected {
        fill: #fff7e6;
        stroke: #ff8c00;
        stroke-width: 2;
      }
      .marker-saved {
        fill: #0b5fff;
        opacity: 0.95;
      }
      .marker-selected {
        fill: #ff6b6b;
        opacity: 0.9;
      }
      .actions {
        margin-top: 12px;
        display: flex;
        gap: 8px;
      }
      button {
        padding: 8px 12px;
        border-radius: 6px;
        border: none;
        background: #1f6feb;
        color: #fff;
        cursor: pointer;
      }
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .danger {
        background: #d9534f;
      }
      .note {
        margin-top: 8px;
        color: #666;
      }
    `,
  ],
})
export class VehicleParkingComponent {
  // sample vehicles
  vehicles: Vehicle[] = [
    {
      id: 1,
      plate: '51A-123.45',
      route: 'Route1',
      driver: 'Nguyễn Văn A',
      parkingSpotId: 2,
    },
    {
      id: 2,
      plate: '29B-999.01',
      route: 'Route2',
      driver: 'Trần Thị B',
      parkingSpotId: null,
    },
    {
      id: 3,
      plate: '30C-888.77',
      route: 'Route3',
      driver: 'Lê Văn C',
      parkingSpotId: 5,
    },
  ];

  // sample parking spots (positions on SVG)
  parkingSpots: ParkingSpot[] = [
    { id: 1, name: 'A1', x: 80, y: 70 },
    { id: 2, name: 'A2', x: 200, y: 70 },
    { id: 3, name: 'A3', x: 320, y: 70 },

    { id: 4, name: 'B1', x: 80, y: 160 },
    { id: 5, name: 'B2', x: 200, y: 160 },
    { id: 6, name: 'B3', x: 320, y: 160 },

    { id: 7, name: 'C1', x: 80, y: 250 },
    { id: 8, name: 'C2', x: 200, y: 250 },
    { id: 9, name: 'C3', x: 320, y: 250 },
  ];

  rectSize = 70;

  // selection state
  selectedVehicleId: number = this.vehicles[0].id;
  // selectedSpotId is temporary selection before saving
  selectedSpotId: number | null = null;

  constructor() {
    // initialize selectedSpotId to reflect initial vehicle
    this.selectedSpotId = this.currentVehicle?.parkingSpotId ?? null;
  }

  // convenience getters
  get currentVehicle(): Vehicle | undefined {
    return this.vehicles.find((v) => v.id === this.selectedVehicleId);
  }

  spotById(id: number | null | undefined): ParkingSpot | undefined {
    return this.parkingSpots.find((s) => s.id === id!);
  }

  // called when user changes vehicle selector
  onVehicleChange(newId: number) {
    // update selectedVehicleId (ngModel already did), then sync selectedSpotId to vehicle's current spot
    this.selectedVehicleId = newId;
    this.selectedSpotId = this.currentVehicle?.parkingSpotId ?? null;
  }

  // user clicked a spot on the map => set temporary selection
  clickSpot(spot: ParkingSpot) {
    this.selectedSpotId = spot.id;
  }

  // save selected spot to the vehicle (persist in sample data)
  saveSelected() {
    const v = this.currentVehicle;
    if (!v) return;
    v.parkingSpotId = this.selectedSpotId;
    // clear temp selection after saving
    this.selectedSpotId = null;
    console.log(`Saved parking spot ${v.parkingSpotId} for vehicle ${v.plate}`);
  }

  cancelSelection() {
    // revert temporary selection to the vehicle's saved one
    this.selectedSpotId = this.currentVehicle?.parkingSpotId ?? null;
  }

  clearCurrent() {
    const v = this.currentVehicle;
    if (!v) return;
    v.parkingSpotId = null;
    this.selectedSpotId = null;
    console.log(`Cleared parking spot for vehicle ${v.plate}`);
  }

  hasSelection(): boolean {
    return this.selectedSpotId !== null;
  }

  canSave(): boolean {
    // must have a vehicle and a selected spot that is different from current
    const v = this.currentVehicle;
    return (
      !!v &&
      this.selectedSpotId !== null &&
      v.parkingSpotId !== this.selectedSpotId
    );
  }
}
