// bus-stop-request.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface BusStopRequest {
  stopName: string;
  address: string;
  latitude: number;
  longitude: number;
  reason: string;
  estimatedUsers: string;
  nearbyLandmarks: string;
  requestorName: string;
  requestorEmail: string;
  requestorPhone: string;
}

@Component({
  selector: 'app-bus-stop-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="request-container">
      <div class="request-card">
        <h2>Đề Xuất Điểm Dừng Xe Mới</h2>
        <form (ngSubmit)="onSubmit()" #requestForm="ngForm">
          <!-- Location Selection -->
          <div class="form-section">
            <h3>Vị Trí Điểm Dừng</h3>

            <div class="map-instruction">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Nhấp vào bản đồ để chọn vị trí điểm dừng mong muốn</span>
            </div>

            <div id="map" class="map-container"></div>

            <div
              class="coordinates-display"
              *ngIf="request.latitude && request.longitude"
            >
              <div class="coord-item">
                <strong>Vĩ độ:</strong> {{ request.latitude.toFixed(6) }}
              </div>
              <div class="coord-item">
                <strong>Kinh độ:</strong> {{ request.longitude.toFixed(6) }}
              </div>
            </div>

            <div class="form-group">
              <label for="stopName">Tên Điểm Dừng Đề Xuất *</label>
              <input
                type="text"
                id="stopName"
                name="stopName"
                [(ngModel)]="request.stopName"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="address">Địa Chỉ *</label>
              <input
                type="text"
                id="address"
                name="address"
                [(ngModel)]="request.address"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="nearbyLandmarks">Địa Điểm Lân Cận</label>
              <input
                type="text"
                id="nearbyLandmarks"
                name="nearbyLandmarks"
                [(ngModel)]="request.nearbyLandmarks"
                class="form-control"
              />
            </div>
          </div>

          <!-- Request Details -->
          <div class="form-section">
            <h3>Chi Tiết Đề Xuất</h3>

            <div class="form-group">
              <label for="reason">Lý Do Đề Xuất *</label>
              <textarea
                id="reason"
                name="reason"
                [(ngModel)]="request.reason"
                required
                rows="4"
                placeholder="Vui lòng mô tả lý do cần có điểm dừng tại vị trí này..."
                class="form-control"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="estimatedUsers">Số Người Sử Dụng Dự Kiến *</label>
              <select
                id="estimatedUsers"
                name="estimatedUsers"
                [(ngModel)]="request.estimatedUsers"
                required
                class="form-control"
              >
                <option value="">Chọn mức độ</option>
                <option value="low">Ít (< 50 người/ngày)</option>
                <option value="medium">Trung Bình (50-100 người/ngày)</option>
                <option value="high">Cao (100-200 người/ngày)</option>
                <option value="very_high">Rất Cao (> 200 người/ngày)</option>
              </select>
            </div>
          </div>

          <!-- Requestor Information -->
          <div class="form-section">
            <h3>Thông Tin Người Đề Xuất</h3>

            <div class="form-group">
              <label for="requestorName">Họ Tên *</label>
              <input
                type="text"
                id="requestorName"
                name="requestorName"
                [(ngModel)]="request.requestorName"
                required
                placeholder="Nguyễn Văn A"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="requestorEmail">Email *</label>
              <input
                type="email"
                id="requestorEmail"
                name="requestorEmail"
                [(ngModel)]="request.requestorEmail"
                required
                placeholder="nguyen.van.a@example.com"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="requestorPhone">Số Điện Thoại *</label>
              <input
                type="tel"
                id="requestorPhone"
                name="requestorPhone"
                [(ngModel)]="request.requestorPhone"
                required
                placeholder="0912345678"
                class="form-control"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              [disabled]="
                !requestForm.form.valid || !request.latitude || isSubmitting
              "
            >
              {{ isSubmitting ? 'Đang Gửi...' : 'Gửi Đề Xuất' }}
            </button>
            <button
              type="button"
              class="btn-secondary"
              (click)="onReset()"
              [disabled]="isSubmitting"
            >
              Đặt Lại
            </button>
          </div>

          <div class="form-note" *ngIf="!request.latitude">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              ></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Vui lòng chọn vị trí trên bản đồ trước khi gửi
          </div>
        </form>

        <!-- Success Message -->
        <div *ngIf="submitted" class="success-message">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <p>Cảm ơn bạn đã gửi đề xuất!</p>
          <p class="tracking-info">Mã Theo Dõi: {{ trackingId }}</p>
          <p class="small-text">
            Chúng tôi sẽ xem xét và phản hồi trong vòng 7-10 ngày làm việc
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .request-container {
      width: 100%;
      height: 100%;
      overflow: auto;
      margin: 0 auto;
      padding: 20px;
      padding-left: 320px;
      padding-right: 320px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .request-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 32px;
    }

    h2 {
      margin: 0 0 8px 0;
      color: #1a1a1a;
      font-size: 28px;
      font-weight: 600;
    }

    .subtitle {
      color: #666;
      margin: 0 0 32px 0;
      font-size: 16px;
    }

    .form-section {
      margin-bottom: 32px;
    }

    .form-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e0e0e0;
    }

    .map-instruction {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 6px;
      margin-bottom: 16px;
      color: #1e40af;
      font-size: 14px;
    }

    .map-instruction svg {
      flex-shrink: 0;
    }

    .map-container {
      width: 100%;
      height: 400px;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
      margin-bottom: 16px;
    }

    .coordinates-display {
      display: flex;
      gap: 24px;
      padding: 12px 16px;
      background: #f8fafc;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .coord-item {
      display: flex;
      gap: 8px;
    }

    .coord-item strong {
      color: #475569;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      font-size: 15px;
      transition: all 0.2s;
      box-sizing: border-box;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    select.form-control {
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }

    .btn-primary,
    .btn-secondary {
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
      flex: 1;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1d4ed8;
    }

    .btn-primary:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #e5e7eb;
    }

    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-note {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
      margin-top: 16px;
      color: #92400e;
      font-size: 14px;
    }

    .form-note svg {
      flex-shrink: 0;
    }

    .success-message {
      margin-top: 24px;
      padding: 24px;
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      text-align: center;
    }

    .success-message svg {
      color: #16a34a;
      margin-bottom: 12px;
    }

    .success-message p {
      margin: 8px 0;
      color: #166534;
    }

    .tracking-info {
      font-weight: 600;
      font-size: 16px;
    }

    .small-text {
      font-size: 13px;
      color: #15803d;
    }

    @media (max-width: 640px) {
      .request-container {
        padding: 12px;
      }

      .request-card {
        padding: 20px;
      }

      .map-container {
        height: 300px;
      }

      .coordinates-display {
        flex-direction: column;
        gap: 8px;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `,
  ],
})
export class BusStopRequestComponent implements OnInit, AfterViewInit {
  request: BusStopRequest = {
    stopName: '',
    address: '',
    latitude: 0,
    longitude: 0,
    reason: '',
    estimatedUsers: '',
    nearbyLandmarks: '',
    requestorName: '',
    requestorEmail: '',
    requestorPhone: '',
  };

  submitted = false;
  isSubmitting = false;
  trackingId = '';

  private map: any;
  private marker: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Wait for Leaflet to load before initializing map
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  initMap() {
    if (typeof L === 'undefined') {
      setTimeout(() => this.initMap(), 200);
      return;
    }

    // Initialize map centered on Hanoi
    this.map = L.map('map').setView([21.0285, 105.8542], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    // Add click event to map
    this.map.on('click', (e: any) => {
      this.onMapClick(e.latlng);
    });
  }

  onMapClick(latlng: any) {
    // Remove existing marker
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Add new marker
    this.marker = L.marker([latlng.lat, latlng.lng], {
      draggable: true,
    }).addTo(this.map);

    // Update coordinates
    this.request.latitude = latlng.lat;
    this.request.longitude = latlng.lng;

    // Add drag event to marker
    this.marker.on('dragend', (e: any) => {
      const position = e.target.getLatLng();
      this.request.latitude = position.lat;
      this.request.longitude = position.lng;
    });

    // Add popup
    this.marker.bindPopup('Vị trí trạm xe đề xuất').openPopup();
  }

  onSubmit() {
    if (!this.request.latitude || !this.request.longitude) {
      alert('Vui lòng chọn vị trí trên bản đồ');
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Bus Stop Request Submitted:', this.request);

      // Generate tracking ID
      this.trackingId =
        'STOP-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      this.submitted = true;
      this.isSubmitting = false;

      // Reset form after 8 seconds
      setTimeout(() => {
        this.submitted = false;
        this.onReset();
      }, 8000);
    }, 1500);
  }

  onReset() {
    this.request = {
      stopName: '',
      address: '',
      latitude: 0,
      longitude: 0,
      reason: '',
      estimatedUsers: '',
      nearbyLandmarks: '',
      requestorName: '',
      requestorEmail: '',
      requestorPhone: '',
    };

    // Remove marker from map
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = null;
    }

    this.submitted = false;
  }
}
