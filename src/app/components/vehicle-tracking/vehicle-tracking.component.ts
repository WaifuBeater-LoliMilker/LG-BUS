import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  currentSpeed: number;
  speedLimit: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  hasIssue: boolean;
  issueDescription?: string;
  status: 'active' | 'idle' | 'warning';
}

@Component({
  selector: 'app-vehicle-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vehicle-tracker">
      <!-- Search and Filter Section -->
      <div class="search-section">
        <div class="search-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên xe, loại xe hoặc địa chỉ..."
            [(ngModel)]="searchTerm"
            (input)="onSearchChange()"
          />
          <button *ngIf="searchTerm" class="clear-btn" (click)="clearSearch()">
            ×
          </button>
        </div>

        <div class="filter-chips">
          <button
            class="filter-chip"
            [class.active]="statusFilter === 'all'"
            (click)="setStatusFilter('all')"
          >
            Tất cả ({{ vehicles.length }})
          </button>
          <button
            class="filter-chip warning"
            [class.active]="statusFilter === 'warning'"
            (click)="setStatusFilter('warning')"
          >
            Cảnh báo ({{ getWarningCount() }})
          </button>
          <button
            class="filter-chip active"
            [class.active]="statusFilter === 'active'"
            (click)="setStatusFilter('active')"
          >
            Hoạt động ({{ getActiveCount() }})
          </button>
          <button
            class="filter-chip idle"
            [class.active]="statusFilter === 'idle'"
            (click)="setStatusFilter('idle')"
          >
            Nghỉ ({{ getIdleCount() }})
          </button>
        </div>
      </div>

      <!-- Map Modal -->
      <div
        class="modal-overlay"
        [class.hidden]="!showMapModal"
        (click)="closeMapModal()"
      >
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Vị Trí - {{ selectedVehicle?.name }}</h3>
            <button class="close-btn" (click)="closeMapModal()">×</button>
          </div>
          <div class="modal-body">
            <div id="map"></div>
            <div class="map-info">
              <div class="info-row">
                <strong>Địa chỉ:</strong>
                <span>{{ selectedVehicle?.location?.address }}</span>
              </div>
              <div class="info-row">
                <strong>Tọa độ:</strong>
                <span
                  >{{ selectedVehicle?.location?.lat?.toFixed(6) }},
                  {{ selectedVehicle?.location?.lng?.toFixed(6) }}</span
                >
              </div>
              <div class="info-row">
                <strong>Tốc độ hiện tại:</strong>
                <span>{{ selectedVehicle?.currentSpeed }} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Modal -->
      <div
        class="modal-overlay"
        [class.hidden]="!showDetailsModal"
        (click)="closeDetailsModal()"
      >
        <div
          class="modal-content modal-details"
          (click)="$event.stopPropagation()"
        >
          <div class="modal-header">
            <h3>Chi Tiết Phương Tiện</h3>
            <button class="close-btn" (click)="closeDetailsModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="detail-section">
              <h4>Thông Tin Xe</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Tên xe:</label>
                  <span>{{ selectedVehicle?.name }}</span>
                </div>
                <div class="detail-item">
                  <label>Loại xe:</label>
                  <span>{{ selectedVehicle?.type }}</span>
                </div>
                <div class="detail-item">
                  <label>Mã số:</label>
                  <span>{{ selectedVehicle?.id }}</span>
                </div>
                <div class="detail-item">
                  <label>Trạng thái:</label>
                  <span class="status-badge" [class]="selectedVehicle?.status">
                    {{ getStatusText(selectedVehicle?.status || '') }}
                  </span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h4>Tốc Độ</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Tốc độ hiện tại:</label>
                  <span class="speed-highlight"
                    >{{ selectedVehicle?.currentSpeed }} km/h</span
                  >
                </div>
                <div class="detail-item">
                  <label>Giới hạn tốc độ:</label>
                  <span>{{ selectedVehicle?.speedLimit }} km/h</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h4>Vị Trí</h4>
              <div class="detail-item full-width">
                <label>Địa chỉ:</label>
                <span>{{ selectedVehicle?.location?.address }}</span>
              </div>
              <div class="detail-item full-width">
                <label>Tọa độ GPS:</label>
                <span class="coords"
                  >{{ selectedVehicle?.location?.lat?.toFixed(6) }},
                  {{ selectedVehicle?.location?.lng?.toFixed(6) }}</span
                >
              </div>
            </div>

            <div
              class="detail-section warnings-section"
              [class.hidden]="
                !selectedVehicle ||
                (!isOverSpeedLimit(selectedVehicle) &&
                  !selectedVehicle.hasIssue)
              "
            >
              <h4>⚠️ Cảnh Báo</h4>

              <div
                class="warning-item warning-speed"
                [class.hidden]="
                  !selectedVehicle || !isOverSpeedLimit(selectedVehicle)
                "
              >
                <div class="warning-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                    />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div class="warning-content">
                  <strong>Vượt Tốc Độ</strong>
                  <p>
                    Xe đang chạy vượt quá
                    {{
                      selectedVehicle &&
                        selectedVehicle.currentSpeed -
                          selectedVehicle.speedLimit
                    }}
                    km/h so với giới hạn cho phép
                  </p>
                </div>
              </div>

              <div
                class="warning-item warning-issue"
                [class.hidden]="!selectedVehicle || !selectedVehicle.hasIssue"
              >
                <div class="warning-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div class="warning-content">
                  <strong>Sự Cố Được Báo Cáo</strong>
                  <p>{{ selectedVehicle?.issueDescription }}</p>
                </div>
              </div>
            </div>

            <div
              class="detail-section"
              [class.hidden]="
                !selectedVehicle ||
                isOverSpeedLimit(selectedVehicle) ||
                selectedVehicle.hasIssue
              "
            >
              <div class="no-warnings">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p>Không có cảnh báo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div *ngIf="filteredVehicles.length === 0" class="no-results">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <h3>Không tìm thấy kết quả</h3>
        <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
      </div>

      <!-- Vehicle List -->
      <div class="vehicle-list">
        <div
          *ngFor="let vehicle of filteredVehicles"
          class="vehicle-card"
          [class.warning]="isSpeedingOrHasIssue(vehicle)"
        >
          <div class="vehicle-header">
            <div class="vehicle-info">
              <h3>{{ vehicle.name }}</h3>
              <span class="vehicle-type">{{ vehicle.type }}</span>
            </div>
            <div class="vehicle-status" [class]="vehicle.status">
              {{ getStatusText(vehicle.status) }}
            </div>
          </div>

          <div class="vehicle-content">
            <div class="speed-section">
              <div class="speed-display">
                <span class="speed-value">{{ vehicle.currentSpeed }}</span>
                <span class="speed-unit">km/h</span>
              </div>
              <div class="speed-limit">
                Giới hạn: {{ vehicle.speedLimit }} km/h
              </div>
            </div>

            <div *ngIf="isOverSpeedLimit(vehicle)" class="alert alert-speed">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span
                >Vượt {{ vehicle.currentSpeed - vehicle.speedLimit }} km/h</span
              >
            </div>

            <div *ngIf="vehicle.hasIssue" class="alert alert-issue">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{{ vehicle.issueDescription }}</span>
            </div>

            <div class="location-section">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span class="location-text">{{ vehicle.location.address }}</span>
            </div>
          </div>

          <div class="vehicle-actions">
            <button class="btn btn-track" (click)="trackVehicle(vehicle)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Bản Đồ
            </button>
            <button class="btn btn-details" (click)="viewDetails(vehicle)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Chi Tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .vehicle-tracker {
        padding: 16px;
        max-width: 1200px;
        height: 100%;
        overflow: auto;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          sans-serif;
      }

      /* Search Section */
      .search-section {
        margin-bottom: 20px;
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .search-box {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }

      .search-box svg {
        position: absolute;
        left: 12px;
        color: #9ca3af;
      }

      .search-box input {
        width: 100%;
        padding: 10px 40px 10px 40px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s;
      }

      .search-box input:focus {
        outline: none;
        border-color: #3b82f6;
      }

      .clear-btn {
        position: absolute;
        right: 8px;
        background: #e5e7eb;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6b7280;
        transition: all 0.2s;
      }

      .clear-btn:hover {
        background: #d1d5db;
        color: #1a202c;
      }

      .filter-chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .filter-chip {
        padding: 6px 14px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        color: #4b5563;
      }

      .filter-chip:hover {
        border-color: #d1d5db;
        background: #f9fafb;
      }

      .filter-chip.active {
        border-color: #3b82f6;
        background: #eff6ff;
        color: #1e40af;
      }

      .filter-chip.warning.active {
        border-color: #f59e0b;
        background: #fffbeb;
        color: #92400e;
      }

      .filter-chip.idle.active {
        border-color: #6b7280;
        background: #f3f4f6;
        color: #1f2937;
      }

      /* No Results */
      .no-results {
        text-align: center;
        padding: 60px 20px;
        color: #9ca3af;
      }

      .no-results svg {
        margin-bottom: 16px;
      }

      .no-results h3 {
        margin: 0 0 8px 0;
        color: #4b5563;
        font-size: 18px;
      }

      .no-results p {
        margin: 0;
        font-size: 14px;
      }

      /* Vehicle List - Compact Design */
      .vehicle-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 12px;
      }

      .vehicle-card {
        background: white;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        border: 2px solid transparent;
      }

      .vehicle-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .vehicle-card.warning {
        border-color: #f59e0b;
        background: #fffbeb;
      }

      .vehicle-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 10px;
      }

      .vehicle-info h3 {
        margin: 0 0 4px 0;
        color: #1a202c;
        font-size: 16px;
        font-weight: 600;
      }

      .vehicle-type {
        display: inline-block;
        padding: 2px 8px;
        background: #e5e7eb;
        border-radius: 10px;
        font-size: 11px;
        color: #4b5563;
        font-weight: 500;
      }

      .vehicle-status {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.3px;
        white-space: nowrap;
      }

      .vehicle-status.active {
        background: #d1fae5;
        color: #065f46;
      }

      .vehicle-status.idle {
        background: #e5e7eb;
        color: #4b5563;
      }

      .vehicle-status.warning {
        background: #fecaca;
        color: #991b1b;
      }

      .vehicle-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .speed-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        background: #f3f4f6;
        border-radius: 6px;
      }

      .speed-display {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }

      .speed-value {
        font-size: 24px;
        font-weight: 700;
        color: #1a202c;
      }

      .speed-unit {
        font-size: 12px;
        color: #6b7280;
        font-weight: 500;
      }

      .speed-limit {
        font-size: 12px;
        color: #6b7280;
      }

      .alert {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 6px;
        font-size: 12px;
      }

      .alert-speed {
        background: #fef3c7;
        color: #92400e;
        border: 1px solid #fbbf24;
      }

      .alert-speed svg {
        color: #f59e0b;
        flex-shrink: 0;
      }

      .alert-issue {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #f87171;
      }

      .alert-issue svg {
        color: #ef4444;
        flex-shrink: 0;
      }

      .location-section {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        background: #f9fafb;
        border-radius: 6px;
        color: #3b82f6;
      }

      .location-text {
        font-size: 12px;
        color: #4b5563;
        line-height: 1.4;
      }

      .vehicle-actions {
        display: flex;
        gap: 6px;
        margin-top: 4px;
      }

      .btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }

      .btn svg {
        width: 14px;
        height: 14px;
      }

      .btn-track {
        background: #3b82f6;
        color: white;
      }

      .btn-track:hover {
        background: #2563eb;
      }

      .btn-details {
        background: #e5e7eb;
        color: #4b5563;
      }

      .btn-details:hover {
        background: #d1d5db;
      }

      /* Modal Styles */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }

      .modal-content {
        background: white;
        border-radius: 12px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .modal-details {
        max-width: 700px;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .modal-header h3 {
        margin: 0;
        font-size: 20px;
        color: #1a202c;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 32px;
        color: #6b7280;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s;
      }

      .close-btn:hover {
        background: #f3f4f6;
        color: #1a202c;
      }

      .modal-body {
        padding: 24px;
      }

      #map {
        height: 500px;
        width: 100%;
        margin-bottom: 16px;
        border-radius: 8px;
      }

      .marker-dot {
        width: 20px;
        height: 20px;
        background-color: #ef4444;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.8;
        }
      }

      .map-info {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        background: #f9fafb;
        border-radius: 6px;
      }

      .info-row strong {
        color: #4b5563;
        font-size: 14px;
      }

      .info-row span {
        color: #1a202c;
        font-size: 14px;
        text-align: right;
      }

      /* Details Modal Styles */
      .detail-section {
        margin-bottom: 24px;
      }

      .detail-section:last-child {
        margin-bottom: 0;
      }

      .detail-section h4 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: #1a202c;
        font-weight: 600;
      }

      .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .detail-item.full-width {
        grid-column: 1 / -1;
      }

      .detail-item label {
        font-size: 13px;
        color: #6b7280;
        font-weight: 500;
      }

      .detail-item span {
        font-size: 15px;
        color: #1a202c;
      }

      .speed-highlight {
        font-size: 24px !important;
        font-weight: 700;
        color: #3b82f6;
      }

      .coords {
        font-family: 'Courier New', monospace;
        font-size: 13px !important;
      }

      .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        width: fit-content;
      }

      .status-badge.active {
        background: #d1fae5;
        color: #065f46;
      }

      .status-badge.idle {
        background: #e5e7eb;
        color: #4b5563;
      }

      .status-badge.warning {
        background: #fecaca;
        color: #991b1b;
      }

      .warnings-section {
        background: #fef3c7;
        padding: 16px;
        border-radius: 8px;
        border: 2px solid #fbbf24;
      }

      .warnings-section h4 {
        margin-bottom: 16px;
      }

      .warning-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: white;
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .warning-item:last-child {
        margin-bottom: 0;
      }

      .warning-speed {
        border-left: 4px solid #f59e0b;
      }

      .warning-issue {
        border-left: 4px solid #ef4444;
      }

      .warning-icon {
        flex-shrink: 0;
      }

      .warning-speed .warning-icon {
        color: #f59e0b;
      }

      .warning-issue .warning-icon {
        color: #ef4444;
      }

      .warning-content {
        flex: 1;
      }

      .warning-content strong {
        display: block;
        margin-bottom: 4px;
        color: #1a202c;
        font-size: 14px;
      }

      .warning-content p {
        margin: 0;
        color: #4b5563;
        font-size: 13px;
        line-height: 1.5;
      }

      .no-warnings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px;
        color: #10b981;
      }

      .no-warnings svg {
        margin-bottom: 12px;
      }

      .no-warnings p {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }

      .hidden {
        display: none !important;
      }

      @media (max-width: 768px) {
        .vehicle-list {
          grid-template-columns: 1fr;
        }

        .filter-chips {
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: 4px;
        }
      }
    `,
  ],
})
export class VehicleTrackerComponent implements OnInit, OnDestroy {
  showMapModal = false;
  showDetailsModal = false;
  selectedVehicle: Vehicle | null = null;
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private animationId: number | undefined;
  private pathIndex = 0;

  searchTerm = '';
  statusFilter: 'all' | 'active' | 'idle' | 'warning' = 'all';
  filteredVehicles: Vehicle[] = [];

  private hanoiPath: L.LatLng[] = [
    L.latLng(21.0285, 105.8542),
    L.latLng(21.0245, 105.8412),
    L.latLng(21.0368, 105.8345),
    L.latLng(21.0294, 105.8544),
    L.latLng(21.0278, 105.8525),
    L.latLng(21.0285, 105.8542),
  ];

  vehicles: Vehicle[] = [
    {
      id: 'V001',
      name: 'Xe 30A-77103',
      type: 'Ca sáng',
      currentSpeed: 65,
      speedLimit: 50,
      location: {
        lat: 21.0285,
        lng: 105.8542,
        address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      },
      hasIssue: false,
      status: 'warning',
    },
    {
      id: 'V002',
      name: 'Xe 30H-55218',
      type: 'Ca sáng',
      currentSpeed: 45,
      speedLimit: 60,
      location: {
        lat: 21.0245,
        lng: 105.8412,
        address: '456 Láng Hạ, Đống Đa, Hà Nội',
      },
      hasIssue: true,
      issueDescription: 'Đã có lỗi phát sinh được báo cáo từ người dùng',
      status: 'warning',
    },
    {
      id: 'V003',
      name: 'Xe 29LD-32022',
      type: 'Ca sáng',
      currentSpeed: 55,
      speedLimit: 60,
      location: {
        lat: 21.0368,
        lng: 105.8345,
        address: '789 Giải Phóng, Hai Bà Trưng, Hà Nội',
      },
      hasIssue: false,
      status: 'active',
    },
    {
      id: 'V004',
      name: 'Xe 43C-55012',
      type: 'Ca sáng',
      currentSpeed: 55,
      speedLimit: 60,
      location: {
        lat: 21.0368,
        lng: 105.8345,
        address: 'Cầu Chương Dương, Hà Nội',
      },
      hasIssue: false,
      status: 'active',
    },
    {
      id: 'V005',
      name: 'Xe 88B-44291',
      type: 'Ca sáng',
      currentSpeed: 55,
      speedLimit: 60,
      location: {
        lat: 21.0368,
        lng: 105.8345,
        address: 'Hồ Hoàn Kiếm, Hà Nội',
      },
      hasIssue: false,
      status: 'active',
    },
    {
      id: 'V006',
      name: 'Xe 29H-93190',
      type: 'Ca sáng',
      currentSpeed: 0,
      speedLimit: 50,
      location: {
        lat: 21.0187,
        lng: 105.8458,
        address: 'Bến Xe, Cầu Giấy, Hà Nội',
      },
      hasIssue: false,
      status: 'idle',
    },
  ];

  ngOnInit() {
    this.filteredVehicles = [...this.vehicles];
    this.initMap();
    this.animateMarker();
    setInterval(() => {
      this.updateVehicleData();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([21.0285, 105.8542], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div class="marker-dot"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    this.marker = L.marker(this.hanoiPath[0], { icon: customIcon }).addTo(
      this.map
    );
  }

  private animateMarker(): void {
    const speed = 0.0003;
    let progress = 0;

    const animate = () => {
      if (!this.marker || !this.map) return;

      progress += speed;

      if (progress >= 1) {
        progress = 0;
        this.pathIndex = (this.pathIndex + 1) % (this.hanoiPath.length - 1);
      }

      const start = this.hanoiPath[this.pathIndex];
      const end = this.hanoiPath[this.pathIndex + 1];

      const lat = start.lat + (end.lat - start.lat) * progress;
      const lng = start.lng + (end.lng - start.lng) * progress;

      this.marker.setLatLng([lat, lng]);

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  onSearchChange() {
    this.filterVehicles();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterVehicles();
  }

  setStatusFilter(status: 'all' | 'active' | 'idle' | 'warning') {
    this.statusFilter = status;
    this.filterVehicles();
  }

  private filterVehicles() {
    let filtered = [...this.vehicles];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(term) ||
          v.type.toLowerCase().includes(term) ||
          v.location.address.toLowerCase().includes(term) ||
          v.id.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((v) => v.status === this.statusFilter);
    }

    this.filteredVehicles = filtered;
  }

  getWarningCount(): number {
    return this.vehicles.filter((v) => v.status === 'warning').length;
  }

  getActiveCount(): number {
    return this.vehicles.filter((v) => v.status === 'active').length;
  }

  getIdleCount(): number {
    return this.vehicles.filter((v) => v.status === 'idle').length;
  }

  isOverSpeedLimit(vehicle: Vehicle): boolean {
    return vehicle.currentSpeed > vehicle.speedLimit;
  }

  isSpeedingOrHasIssue(vehicle: Vehicle): boolean {
    return this.isOverSpeedLimit(vehicle) || vehicle.hasIssue;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: 'HOẠT ĐỘNG',
      idle: 'NGHỈ',
      warning: 'CẢNH BÁO',
    };
    return statusMap[status] || status.toUpperCase();
  }

  trackVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showMapModal = true;
  }

  viewDetails(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showDetailsModal = true;
  }

  closeMapModal() {
    this.showMapModal = false;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
  }

  private updateVehicleData() {
    this.vehicles = this.vehicles.map((vehicle) => {
      if (vehicle.status !== 'idle') {
        const speedChange = Math.floor(Math.random() * 11) - 5;
        const newSpeed = Math.max(
          0,
          Math.min(80, vehicle.currentSpeed + speedChange)
        );

        return {
          ...vehicle,
          currentSpeed: newSpeed,
          status:
            newSpeed > vehicle.speedLimit || vehicle.hasIssue
              ? 'warning'
              : 'active',
        };
      }
      return vehicle;
    });

    this.filterVehicles();
  }
}
