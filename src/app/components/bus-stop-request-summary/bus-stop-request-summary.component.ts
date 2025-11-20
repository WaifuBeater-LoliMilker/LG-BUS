// bus-stop-request-summary.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface BusStopRequest {
  id: string;
  stopName: string;
  address: string;
  latitude: number;
  longitude: number;
  reason: string;
  estimatedUsers: string;
  nearbyLandmarks: string;
  requestorName: string;
  status: string;
  votes: number;
  createdAt: string;
  hasVoted: boolean;
}

@Component({
  selector: 'app-bus-stop-request-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="summary-container">
      <div class="summary-header">
        <h2>Đề Xuất Điểm Dừng Mới</h2>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadRequests()">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path
                d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
              ></path>
            </svg>
            Làm Mới
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filter-group">
          <label>Trạng Thái:</label>
          <select
            [(ngModel)]="filterStatus"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="">Tất Cả</option>
            <option value="pending">Đang Xét Duyệt</option>
            <option value="approved">Đã Chấp Thuận</option>
            <option value="rejected">Bị Từ Chối</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Sắp Xếp:</label>
          <select
            [(ngModel)]="sortBy"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="votes">Nhiều Vote Nhất</option>
            <option value="newest">Mới Nhất</option>
            <option value="oldest">Cũ Nhất</option>
          </select>
        </div>

        <div class="filter-group search-group">
          <label>Tìm Kiếm:</label>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
            placeholder="Tên trạm, địa chỉ..."
            class="filter-search"
          />
        </div>
      </div>

      <!-- Requests List -->
      <div class="requests-list">
        <div class="list-header">
          <div class="header-col col-name">Tên Điểm Dừng</div>
          <div class="header-col col-address">Địa Chỉ</div>
          <div class="header-col col-status">Trạng Thái</div>
          <div class="header-col col-votes">Votes</div>
          <div class="header-col col-date">Ngày Tạo</div>
          <div class="header-col col-actions">Hành Động</div>
        </div>

        <div class="list-body">
          <div *ngFor="let request of filteredRequests" class="list-item">
            <div class="item-col col-name">
              <div class="name-content">
                <strong>{{ request.stopName }}</strong>
                <span class="request-id">{{ request.id }}</span>
              </div>
            </div>

            <div class="item-col col-address">
              <div class="address-content">
                <div class="address-main">{{ request.address }}</div>
                <div class="address-landmarks" *ngIf="request.nearbyLandmarks">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    ></path>
                  </svg>
                  {{ request.nearbyLandmarks }}
                </div>
              </div>
            </div>

            <div class="item-col col-status">
              <span
                class="badge badge-status"
                [ngClass]="'status-' + request.status"
              >
                {{ getStatusLabel(request.status) }}
              </span>
            </div>

            <div class="item-col col-votes">
              <button
                class="vote-button"
                [class.voted]="request.hasVoted"
                (click)="toggleVote(request)"
                [disabled]="request.status !== 'pending'"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M2 21h4V9H2v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L14 1 7.59 7.41A2 2 0 0 0 7 8.83V19a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3-7A2 2 0 0 0 23 10z"
                  />
                </svg>
                <span class="vote-count">{{ request.votes }}</span>
              </button>
            </div>

            <div class="item-col col-date">
              {{ formatDate(request.createdAt) }}
            </div>

            <div class="item-col col-actions">
              <button class="btn-action" (click)="viewDetails(request)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
                Chi Tiết
              </button>
              <button class="btn-action btn-map" (click)="viewOnMap(request)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Bản Đồ
              </button>
            </div>
          </div>

          <div *ngIf="filteredRequests.length === 0" class="no-data">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Không có dữ liệu</p>
          </div>
        </div>
      </div>

      <!-- Details Modal -->
      <div
        *ngIf="selectedRequestDetails"
        class="modal-overlay"
        (click)="closeDetails()"
      >
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Chi Tiết Đề Xuất - {{ selectedRequestDetails.stopName }}</h3>
            <button class="btn-close" (click)="closeDetails()">×</button>
          </div>

          <div class="modal-body">
            <div class="detail-grid">
              <div class="detail-item">
                <label>Mã Đề Xuất:</label>
                <span class="request-id-detail">{{
                  selectedRequestDetails.id
                }}</span>
              </div>
              <div class="detail-item">
                <label>Trạng Thái:</label>
                <span
                  class="badge badge-status"
                  [ngClass]="'status-' + selectedRequestDetails.status"
                >
                  {{ getStatusLabel(selectedRequestDetails.status) }}
                </span>
              </div>
              <div class="detail-item full-width">
                <label>Địa Chỉ:</label>
                <span>{{ selectedRequestDetails.address }}</span>
              </div>
              <div
                class="detail-item full-width"
                *ngIf="selectedRequestDetails.nearbyLandmarks"
              >
                <label>Địa Điểm Lân Cận:</label>
                <span>{{ selectedRequestDetails.nearbyLandmarks }}</span>
              </div>
              <div class="detail-item">
                <label>Tọa Độ:</label>
                <span
                  >{{ selectedRequestDetails.latitude.toFixed(6) }},
                  {{ selectedRequestDetails.longitude.toFixed(6) }}</span
                >
              </div>
              <div class="detail-item">
                <label>Số Người Sử Dụng Dự Kiến:</label>
                <span>{{
                  getEstimatedUsersLabel(selectedRequestDetails.estimatedUsers)
                }}</span>
              </div>
              <div class="detail-item">
                <label>Người Đề Xuất:</label>
                <span>{{ selectedRequestDetails.requestorName }}</span>
              </div>
              <div class="detail-item">
                <label>Số Votes:</label>
                <span class="vote-display"
                  >{{ selectedRequestDetails.votes }} lượt vote</span
                >
              </div>
              <div class="detail-item full-width">
                <label>Lý Do:</label>
                <p class="description-text">
                  {{ selectedRequestDetails.reason }}
                </p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeDetails()">Đóng</button>
          </div>
        </div>
      </div>

      <!-- Map Modal -->
      <div *ngIf="selectedRequest" class="modal-overlay" (click)="closeMap()">
        <div class="modal-content map-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ selectedRequest.stopName }}</h3>
            <button class="btn-close" (click)="closeMap()">×</button>
          </div>

          <div class="modal-body">
            <div id="detailMap" class="detail-map"></div>

            <div class="location-info">
              <div class="info-item">
                <strong>Địa chỉ:</strong>
                <span>{{ selectedRequest.address }}</span>
              </div>
              <div class="info-item">
                <strong>Tọa độ:</strong>
                <span
                  >{{ selectedRequest.latitude.toFixed(6) }},
                  {{ selectedRequest.longitude.toFixed(6) }}</span
                >
              </div>
              <div class="info-item" *ngIf="selectedRequest.nearbyLandmarks">
                <strong>Địa điểm lân cận:</strong>
                <span>{{ selectedRequest.nearbyLandmarks }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeMap()">Đóng</button>
          </div>
        </div>
      </div>

      <!-- Vote Success Toast -->
      <div *ngIf="showVoteToast" class="vote-toast">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>{{ voteToastMessage }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .summary-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;
      }

      .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .summary-header h2 {
        margin: 0;
        color: #1a1a1a;
        font-size: 28px;
        font-weight: 600;
      }

      .btn-refresh {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }

      .btn-refresh:hover {
        background: #1d4ed8;
      }

      .filters-section {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .filter-group label {
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }

      .filter-select,
      .filter-search {
        padding: 8px 12px;
        border: 1px solid #d0d0d0;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s;
      }

      .filter-select:focus,
      .filter-search:focus {
        outline: none;
        border-color: #2563eb;
      }

      /* List Styles */
      .requests-list {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .list-header {
        display: grid;
        grid-template-columns: 2fr 2.5fr 1.2fr 0.8fr 1fr 1.5fr;
        gap: 16px;
        padding: 16px 20px;
        background: #f8fafc;
        border-bottom: 2px solid #e2e8f0;
        font-weight: 600;
        font-size: 14px;
        color: #475569;
      }

      .list-body {
        max-height: 70vh;
        overflow-y: auto;
      }

      .list-item {
        display: grid;
        grid-template-columns: 2fr 2.5fr 1.2fr 0.8fr 1fr 1.5fr;
        gap: 16px;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.2s;
        align-items: center;
      }

      .list-item:hover {
        background: #f8fafc;
      }

      .list-item:last-child {
        border-bottom: none;
      }

      .item-col {
        font-size: 14px;
      }

      .col-name .name-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .col-name strong {
        color: #1a1a1a;
        font-size: 15px;
      }

      .col-name .request-id {
        font-family: monospace;
        font-size: 11px;
        color: #64748b;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        width: fit-content;
      }

      .address-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .address-main {
        color: #334155;
      }

      .address-landmarks {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #64748b;
      }

      .address-landmarks svg {
        flex-shrink: 0;
      }

      .col-votes {
        display: flex;
        justify-content: center;
      }

      .vote-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        color: #64748b;
        font-size: 14px;
        font-weight: 600;
      }

      .vote-button:hover:not(:disabled) {
        border-color: #3b82f6;
        color: #3b82f6;
        transform: scale(1.05);
      }

      .vote-button.voted {
        background: #3b82f6;
        border-color: #3b82f6;
        color: white;
      }

      .vote-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .col-date {
        color: #64748b;
      }

      .col-actions {
        display: flex;
        gap: 8px;
      }

      .btn-action {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 10px;
        background: white;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: #475569;
        transition: all 0.2s;
      }

      .btn-action:hover {
        background: #f1f5f9;
        border-color: #94a3b8;
      }

      .btn-action.btn-map {
        color: #3b82f6;
      }

      .btn-action.btn-map:hover {
        background: #eff6ff;
        border-color: #3b82f6;
      }

      .no-data {
        text-align: center;
        padding: 60px 20px;
        color: #94a3b8;
      }

      .no-data svg {
        margin-bottom: 16px;
      }

      .no-data p {
        margin: 0;
        font-size: 16px;
      }

      .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }

      .badge-status.status-pending {
        background: #fef3c7;
        color: #92400e;
      }

      .badge-status.status-approved {
        background: #d1fae5;
        color: #065f46;
      }

      .badge-status.status-rejected {
        background: #fee2e2;
        color: #991b1b;
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
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }

      .map-modal {
        max-width: 900px;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .modal-header h3 {
        margin: 0;
        font-size: 20px;
        color: #1a1a1a;
      }

      .btn-close {
        background: none;
        border: none;
        font-size: 32px;
        color: #9ca3af;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
      }

      .btn-close:hover {
        color: #374151;
      }

      .modal-body {
        padding: 24px;
      }

      .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .detail-item.full-width {
        grid-column: span 2;
      }

      .detail-item label {
        font-size: 13px;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .detail-item span {
        font-size: 15px;
        color: #1f2937;
      }

      .request-id-detail {
        font-family: monospace;
        background: #f1f5f9;
        padding: 4px 8px;
        border-radius: 4px;
        width: fit-content;
      }

      .vote-display {
        font-weight: 600;
        color: #3b82f6;
      }

      .description-text {
        margin: 0;
        padding: 12px;
        background: #f9fafb;
        border-radius: 6px;
        color: #374151;
        line-height: 1.6;
      }

      .detail-map {
        width: 100%;
        height: 400px;
        border-radius: 8px;
        border: 2px solid #e2e8f0;
        margin-bottom: 20px;
      }

      .location-info {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .info-item strong {
        font-size: 13px;
        color: #6b7280;
        font-weight: 600;
      }

      .info-item span {
        font-size: 15px;
        color: #1f2937;
      }

      .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: flex-end;
      }

      .btn-secondary {
        padding: 10px 20px;
        background: #f3f4f6;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        color: #374151;
      }

      .btn-secondary:hover {
        background: #e5e7eb;
      }

      /* Vote Toast */
      .vote-toast {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1f2937;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .summary-container {
          padding: 12px;
        }

        .filters-section {
          grid-template-columns: 1fr;
        }

        .list-header {
          display: none;
        }

        .list-item {
          grid-template-columns: 1fr;
          gap: 12px;
          padding: 16px;
        }

        .col-name .name-content {
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .col-actions {
          padding-top: 8px;
          border-top: 1px solid #e2e8f0;
        }

        .detail-grid {
          grid-template-columns: 1fr;
        }

        .detail-item.full-width {
          grid-column: span 1;
        }

        .detail-map {
          height: 300px;
        }
      }
    `,
  ],
})
export class BusStopRequestSummaryComponent implements OnInit, AfterViewInit {
  requests: BusStopRequest[] = [];
  filteredRequests: BusStopRequest[] = [];
  selectedRequest: BusStopRequest | null = null;
  selectedRequestDetails: BusStopRequest | null = null;

  filterStatus = '';
  sortBy = 'votes';
  searchTerm = '';

  showVoteToast = false;
  voteToastMessage = '';

  private detailMap: any;

  ngOnInit() {
    this.loadRequests();
  }

  ngAfterViewInit() {
    // Map will be initialized when modal opens
  }

  loadRequests() {
    // Simulated data
    this.requests = [
      {
        id: 'STOP-A1B2C3D',
        stopName: 'Ngã Tư Sở',
        address: 'Ngã Tư Sở, Đống Đa, Hà Nội',
        latitude: 21.0134,
        longitude: 105.8268,
        reason:
          'Khu vực đông dân cư, nhiều sinh viên và công nhân cần di chuyển',
        estimatedUsers: 'high',
        nearbyLandmarks: 'Gần Big C Thăng Long, ĐHBK Hà Nội',
        requestorName: 'Nguyễn Văn A',
        status: 'pending',
        votes: 127,
        createdAt: '2025-11-15T09:00:00',
        hasVoted: false,
      },
      {
        id: 'STOP-E4F5G6H',
        stopName: 'Keangnam',
        address: 'Phạm Hùng, Nam Từ Liêm, Hà Nội',
        latitude: 21.0171,
        longitude: 105.785,
        reason:
          'Tòa nhà cao tầng với hàng nghìn người làm việc, hiện không có trạm xe bus gần',
        estimatedUsers: 'very_high',
        nearbyLandmarks: 'Tòa Keangnam Landmark 72',
        requestorName: 'Trần Thị B',
        status: 'approved',
        votes: 245,
        createdAt: '2025-11-10T14:30:00',
        hasVoted: true,
      },
      {
        id: 'STOP-I7J8K9L',
        stopName: 'Vincom Royal City',
        address: 'Thanh Xuân, Hà Nội',
        latitude: 20.9991,
        longitude: 105.8105,
        reason: 'Khu chung cư lớn với hơn 10,000 cư dân',
        estimatedUsers: 'high',
        nearbyLandmarks: 'Vincom Mega Mall Royal City',
        requestorName: 'Lê Văn C',
        status: 'pending',
        votes: 89,
        createdAt: '2025-11-12T11:00:00',
        hasVoted: false,
      },
      {
        id: 'STOP-M1N2O3P',
        stopName: 'Times City',
        address: 'Minh Khai, Hai Bà Trưng, Hà Nội',
        latitude: 20.996,
        longitude: 105.8695,
        reason: 'Trung tâm thương mại và khu đô thị lớn',
        estimatedUsers: 'very_high',
        nearbyLandmarks: 'Times City Park Hill',
        requestorName: 'Phạm Minh D',
        status: 'pending',
        votes: 156,
        createdAt: '2025-11-14T16:45:00',
        hasVoted: false,
      },
      {
        id: 'STOP-Q4R5S6T',
        stopName: 'Hồ Tây',
        address: 'Đường Âu Cơ, Tây Hồ, Hà Nội',
        latitude: 21.0596,
        longitude: 105.8195,
        reason: 'Điểm du lịch nổi tiếng, nhiều khách tham quan',
        estimatedUsers: 'medium',
        nearbyLandmarks: 'Hồ Tây, Chùa Trấn Quốc',
        requestorName: 'Đỗ Thị E',
        status: 'rejected',
        votes: 34,
        createdAt: '2025-11-08T10:20:00',
        hasVoted: false,
      },
    ];
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.requests];

    // Filter by status
    if (this.filterStatus) {
      filtered = filtered.filter((r) => r.status === this.filterStatus);
    }

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.stopName.toLowerCase().includes(term) ||
          r.address.toLowerCase().includes(term) ||
          r.id.toLowerCase().includes(term)
      );
    }

    // Sort
    if (this.sortBy === 'votes') {
      filtered.sort((a, b) => b.votes - a.votes);
    } else if (this.sortBy === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (this.sortBy === 'oldest') {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    this.filteredRequests = filtered;
  }

  getTotalRequests(): number {
    return this.requests.length;
  }

  getRequestsByStatus(status: string): number {
    return this.requests.filter((r) => r.status === status).length;
  }

  getTotalVotes(): number {
    return this.requests.reduce((sum, r) => sum + r.votes, 0);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Đang Xét Duyệt',
      approved: 'Đã Chấp Thuận',
      rejected: 'Bị Từ Chối',
    };
    return labels[status] || status;
  }

  getEstimatedUsersLabel(users: string): string {
    const labels: { [key: string]: string } = {
      low: '< 50 người/ngày',
      medium: '50-100 người/ngày',
      high: '100-200 người/ngày',
      very_high: '> 200 người/ngày',
    };
    return labels[users] || users;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  toggleVote(request: BusStopRequest) {
    if (request.status !== 'pending') {
      return;
    }

    if (request.hasVoted) {
      request.votes--;
      request.hasVoted = false;
      this.voteToastMessage = 'Đã bỏ vote';
    } else {
      request.votes++;
      request.hasVoted = true;
      this.voteToastMessage = 'Đã vote thành công!';
    }

    this.showVoteToast = true;

    setTimeout(() => {
      this.showVoteToast = false;
    }, 3000);

    // Re-sort if sorting by votes
    if (this.sortBy === 'votes') {
      this.applyFilters();
    }
  }

  viewDetails(request: BusStopRequest) {
    this.selectedRequestDetails = request;
  }

  closeDetails() {
    this.selectedRequestDetails = null;
  }

  viewOnMap(request: BusStopRequest) {
    this.selectedRequest = request;

    // Wait for modal to render
    setTimeout(() => {
      this.initDetailMap();
    }, 100);
  }

  initDetailMap() {
    if (typeof L === 'undefined' || !this.selectedRequest) {
      setTimeout(() => this.initDetailMap(), 200);
      return;
    }

    // Remove existing map if any
    if (this.detailMap) {
      this.detailMap.remove();
    }

    // Initialize map
    this.detailMap = L.map('detailMap').setView(
      [this.selectedRequest.latitude, this.selectedRequest.longitude],
      15
    );

    // Add tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.detailMap);

    // Add marker
    const marker = L.marker([
      this.selectedRequest.latitude,
      this.selectedRequest.longitude,
    ]).addTo(this.detailMap);

    marker
      .bindPopup(
        `<b>${this.selectedRequest.stopName}</b><br>${this.selectedRequest.address}`
      )
      .openPopup();
  }

  closeMap() {
    if (this.detailMap) {
      this.detailMap.remove();
      this.detailMap = null;
    }
    this.selectedRequest = null;
  }
}
