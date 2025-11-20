// bus-issue-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IssueReport {
  id: string;
  busNumber: string;
  route: string;
  issueType: string;
  description: string;
  dateTime: string;
  location: string;
  priority: string;
  status: string;
  contactName: string;
  contactEmail: string;
  createdAt: string;
}

@Component({
  selector: 'app-bus-issue-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="summary-container">
      <div class="summary-header">
        <h2>Tổng Hợp Sự Cố Xe Bus</h2>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card total">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-value">{{ getTotalIssues() }}</div>
            <div class="stat-label">Tổng Sự Cố</div>
          </div>
        </div>

        <div class="stat-card pending">
          <div class="stat-icon">✏️</div>
          <div class="stat-content">
            <div class="stat-value">{{ getIssuesByStatus('pending') }}</div>
            <div class="stat-label">Đang Chờ</div>
          </div>
        </div>

        <div class="stat-card progress-current">
          <div class="stat-icon">⏳</div>
          <div class="stat-content">
            <div class="stat-value">{{ getIssuesByStatus('in_progress') }}</div>
            <div class="stat-label">Đang Xử Lý</div>
          </div>
        </div>

        <div class="stat-card resolved">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-value">{{ getIssuesByStatus('resolved') }}</div>
            <div class="stat-label">Đã Giải Quyết</div>
          </div>
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
            <option value="pending">Đang Chờ</option>
            <option value="in_progress">Đang Xử Lý</option>
            <option value="resolved">Đã Giải Quyết</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Loại Sự Cố:</label>
          <select
            [(ngModel)]="filterType"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="">Tất Cả</option>
            <option value="delay">Chậm Trễ</option>
            <option value="noshow">Xe Không Đến</option>
            <option value="overcrowding">Quá Đông</option>
            <option value="cleanliness">Vệ Sinh</option>
            <option value="safety">An Toàn</option>
            <option value="driver">Tài Xế</option>
            <option value="mechanical">Kỹ Thuật</option>
            <option value="route">Tuyến Đường</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Mức Độ:</label>
          <select
            [(ngModel)]="filterPriority"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="">Tất Cả</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung Bình</option>
            <option value="high">Cao</option>
            <option value="urgent">Khẩn Cấp</option>
          </select>
        </div>

        <div class="filter-group search-group">
          <label>Tìm Kiếm:</label>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
            placeholder="Số xe, tuyến đường..."
            class="filter-search"
          />
        </div>
      </div>

      <!-- Issues Table -->
      <div class="table-container">
        <table class="issues-table">
          <thead>
            <tr>
              <th>Tuyến</th>
              <th>Biển số</th>
              <th>Tuyến</th>
              <th>Loại Sự Cố</th>
              <th>Mức Độ</th>
              <th>Trạng Thái</th>
              <th>Ngày Giờ</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let issue of filteredIssues"
              [class.urgent-row]="issue.priority === 'urgent'"
            >
              <td>
                <span class="issue-id">{{ issue.id }}</span>
              </td>
              <td>
                <strong>{{ issue.busNumber }}</strong>
              </td>
              <td>{{ issue.route }}</td>
              <td>
                <span class="badge badge-type">{{
                  getIssueTypeLabel(issue.issueType)
                }}</span>
              </td>
              <td>
                <span
                  class="badge badge-priority"
                  [ngClass]="'priority-' + issue.priority"
                >
                  {{ getPriorityLabel(issue.priority) }}
                </span>
              </td>
              <td>
                <span
                  class="badge badge-status"
                  [ngClass]="'status-' + issue.status"
                >
                  {{ getStatusLabel(issue.status) }}
                </span>
              </td>
              <td>{{ formatDateTime(issue.dateTime) }}</td>
              <td>
                <button class="btn-view" (click)="viewDetails(issue)">
                  Chi Tiết
                </button>
              </td>
            </tr>
            <tr *ngIf="filteredIssues.length === 0">
              <td colspan="8" class="no-data">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Issue Details Modal -->
      <div *ngIf="selectedIssue" class="modal-overlay" (click)="closeDetails()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Chi Tiết Sự Cố - {{ selectedIssue.id }}</h3>
            <button class="btn-close" (click)="closeDetails()">×</button>
          </div>

          <div class="modal-body">
            <div class="detail-grid">
              <div class="detail-item">
                <label>Số Xe:</label>
                <span>{{ selectedIssue.busNumber }}</span>
              </div>
              <div class="detail-item">
                <label>Tuyến Đường:</label>
                <span>{{ selectedIssue.route }}</span>
              </div>
              <div class="detail-item">
                <label>Loại Sự Cố:</label>
                <span>{{ getIssueTypeLabel(selectedIssue.issueType) }}</span>
              </div>
              <div class="detail-item">
                <label>Mức Độ:</label>
                <span
                  class="badge badge-priority"
                  [ngClass]="'priority-' + selectedIssue.priority"
                >
                  {{ getPriorityLabel(selectedIssue.priority) }}
                </span>
              </div>
              <div class="detail-item">
                <label>Trạng Thái:</label>
                <span
                  class="badge badge-status"
                  [ngClass]="'status-' + selectedIssue.status"
                >
                  {{ getStatusLabel(selectedIssue.status) }}
                </span>
              </div>
              <div class="detail-item">
                <label>Ngày Giờ:</label>
                <span>{{ formatDateTime(selectedIssue.dateTime) }}</span>
              </div>
              <div class="detail-item">
                <label>Vị Trí:</label>
                <span>{{ selectedIssue.location || 'Không có' }}</span>
              </div>
              <div class="detail-item">
                <label>Người Báo Cáo:</label>
                <span>{{ selectedIssue.contactName }}</span>
              </div>
              <div class="detail-item">
                <label>Email:</label>
                <span>{{ selectedIssue.contactEmail }}</span>
              </div>
              <div class="detail-item full-width">
                <label>Mô Tả:</label>
                <p class="description-text">{{ selectedIssue.description }}</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeDetails()">Đóng</button>
          </div>
        </div>
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

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 16px;
        border-left: 4px solid;
      }

      .stat-card.total {
        border-left-color: #6366f1;
      }
      .stat-card.pending {
        border-left-color: #f59e0b;
      }
      .stat-card.progress-current {
        border-left-color: #3b82f6;
      }
      .stat-card.resolved {
        border-left-color: #10b981;
      }

      .stat-icon {
        font-size: 32px;
      }

      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #1a1a1a;
      }

      .stat-label {
        font-size: 14px;
        color: #666;
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

      .search-group {
        grid-column: span 1;
      }

      .table-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .issues-table {
        width: 100%;
        border-collapse: collapse;
      }

      .issues-table thead {
        background: #f8fafc;
      }

      .issues-table th {
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: #475569;
        font-size: 14px;
        border-bottom: 2px solid #e2e8f0;
      }

      .issues-table td {
        padding: 16px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 14px;
      }

      .issues-table tbody tr {
        transition: background 0.2s;
      }

      .issues-table tbody tr:hover {
        background: #f8fafc;
      }

      .urgent-row {
        background: #fef2f2 !important;
      }

      .issue-id {
        font-family: monospace;
        background: #f1f5f9;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
      }

      .badge-type {
        background: #e0e7ff;
        color: #3730a3;
      }

      .badge-priority.priority-low {
        background: #d1fae5;
        color: #065f46;
      }

      .badge-priority.priority-medium {
        background: #fed7aa;
        color: #92400e;
      }

      .badge-priority.priority-high {
        background: #fecaca;
        color: #991b1b;
      }

      .badge-priority.priority-urgent {
        background: #dc2626;
        color: white;
      }

      .badge-status.status-pending {
        background: #fef3c7;
        color: #92400e;
      }

      .badge-status.status-in_progress {
        background: #dbeafe;
        color: #1e40af;
      }

      .badge-status.status-resolved {
        background: #d1fae5;
        color: #065f46;
      }

      .btn-view {
        padding: 6px 12px;
        background: #f1f5f9;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: #334155;
        transition: background 0.2s;
      }

      .btn-view:hover {
        background: #e2e8f0;
      }

      .no-data {
        text-align: center;
        color: #94a3b8;
        padding: 40px !important;
        font-style: italic;
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
        max-width: 700px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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

      .description-text {
        margin: 0;
        padding: 12px;
        background: #f9fafb;
        border-radius: 6px;
        color: #374151;
        line-height: 1.6;
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

      @media (max-width: 768px) {
        .summary-container {
          padding: 12px;
        }

        .filters-section {
          grid-template-columns: 1fr;
        }

        .table-container {
          overflow-x: auto;
        }

        .issues-table {
          min-width: 900px;
        }

        .detail-grid {
          grid-template-columns: 1fr;
        }

        .detail-item.full-width {
          grid-column: span 1;
        }
      }
    `,
  ],
})
export class BusIssueSummaryComponent implements OnInit {
  issues: IssueReport[] = [];
  filteredIssues: IssueReport[] = [];
  selectedIssue: IssueReport | null = null;

  filterStatus = '';
  filterType = '';
  filterPriority = '';
  searchTerm = '';

  ngOnInit() {
    this.loadIssues();
  }

  loadIssues() {
    // Simulated data - replace with actual API call
    this.issues = [
      {
        id: 'Route1',
        busNumber: '29H-93190',
        route: 'Cầu Giấy - Hà Đông',
        issueType: 'delay',
        description: 'Xe chậm hơn 30 phút so với lịch trình',
        dateTime: '2025-11-18T08:30:00',
        location: 'Ngã Tư Sở',
        priority: 'high',
        status: 'pending',
        contactName: 'Nguyễn Văn A',
        contactEmail: 'nguyenvana@example.com',
        createdAt: '2025-11-18T08:35:00',
      },
      {
        id: 'Route2',
        busNumber: '29LD-32022',
        route: 'Bến Xe Mỹ Đình - Sân Bay Nội Bài',
        issueType: 'overcrowding',
        description: 'Xe quá tải, nhiều người phải đứng',
        dateTime: '2025-11-18T07:15:00',
        location: 'Bến Xe Mỹ Đình',
        priority: 'medium',
        status: 'in_progress',
        contactName: 'Trần Thị B',
        contactEmail: 'tranthib@example.com',
        createdAt: '2025-11-18T07:20:00',
      },
      {
        id: 'Route3',
        busNumber: '29A-77234',
        route: 'Kim Mã - Long Biên',
        issueType: 'safety',
        description: 'Tài xế lái xe không an toàn, đánh lái gấp',
        dateTime: '2025-11-17T18:00:00',
        location: 'Cầu Long Biên',
        priority: 'urgent',
        status: 'resolved',
        contactName: 'Lê Văn C',
        contactEmail: 'levanc@example.com',
        createdAt: '2025-11-17T18:10:00',
      },
      {
        id: 'Route4',
        busNumber: '99H-11823',
        route: 'Bát Tràng - Gia Lâm',
        issueType: 'cleanliness',
        description: 'Xe không được vệ sinh, ghế ngồi dơ bẩn',
        dateTime: '2025-11-18T09:00:00',
        location: 'Bến Xe Gia Lâm',
        priority: 'low',
        status: 'pending',
        contactName: 'Phạm Minh D',
        contactEmail: 'phamminhd@example.com',
        createdAt: '2025-11-18T09:15:00',
      },
      {
        id: 'Route5',
        busNumber: '88B-44291',
        route: 'Thanh Xuân - Hà Đông',
        issueType: 'mechanical',
        description: 'Điều hòa không hoạt động, xe quá nóng',
        dateTime: '2025-11-18T10:30:00',
        location: 'Ngã Tư Sở',
        priority: 'medium',
        status: 'in_progress',
        contactName: 'Đỗ Thị E',
        contactEmail: 'dothie@example.com',
        createdAt: '2025-11-18T10:45:00',
      },
      {
        id: 'Route6',
        busNumber: '30A-77103',
        route: 'Hoàng Mai - Đống Đa',
        issueType: 'noshow',
        description: 'Xe không đến theo lịch trình, chờ quá 45 phút',
        dateTime: '2025-11-18T06:30:00',
        location: 'Bến Xe Hoàng Mai',
        priority: 'high',
        status: 'resolved',
        contactName: 'Vũ Văn F',
        contactEmail: 'vuvanf@example.com',
        createdAt: '2025-11-18T07:15:00',
      },
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredIssues = this.issues.filter((issue) => {
      const matchStatus =
        !this.filterStatus || issue.status === this.filterStatus;
      const matchType = !this.filterType || issue.issueType === this.filterType;
      const matchPriority =
        !this.filterPriority || issue.priority === this.filterPriority;
      const matchSearch =
        !this.searchTerm ||
        issue.busNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        issue.route.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchStatus && matchType && matchPriority && matchSearch;
    });
  }

  getTotalIssues(): number {
    return this.issues.length;
  }

  getIssuesByStatus(status: string): number {
    return this.issues.filter((i) => i.status === status).length;
  }

  getIssueTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      delay: 'Chậm Trễ',
      noshow: 'Không Đến',
      overcrowding: 'Quá Đông',
      cleanliness: 'Vệ Sinh',
      safety: 'An Toàn',
      driver: 'Tài Xế',
      mechanical: 'Kỹ Thuật',
      route: 'Tuyến Đường',
      other: 'Khác',
    };
    return labels[type] || type;
  }

  getPriorityLabel(priority: string): string {
    const labels: { [key: string]: string } = {
      low: 'Thấp',
      medium: 'Trung Bình',
      high: 'Cao',
      urgent: 'Khẩn Cấp',
    };
    return labels[priority] || priority;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Đang Chờ',
      in_progress: 'Đang Xử Lý',
      resolved: 'Đã Giải Quyết',
    };
    return labels[status] || status;
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  viewDetails(issue: IssueReport) {
    this.selectedIssue = issue;
  }

  closeDetails() {
    this.selectedIssue = null;
  }
}
