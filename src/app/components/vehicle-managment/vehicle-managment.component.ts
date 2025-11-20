/*
Standalone Angular component: VehicleListComponent
- Hiển thị danh sách phương tiện (biển số, tên tuyến, lái xe, trạng thái, vị trí, cập nhật lần cuối)
- Có tìm kiếm, sắp xếp cột, và responsive
- Sử dụng template + styles inline để tiện nhúng một file duy nhất

Usage (ví dụ trong một component cha):
1) import biểu mẫu dữ liệu và gán `vehicles` từ backend hoặc mock
2) trong template cha: <app-vehicle-list [vehicles]="vehicles"></app-vehicle-list>

Mã dưới đây là một file TypeScript duy nhất chứa component standalone.
*/

import { Component, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { VehicleParkingComponent } from '../vehicle-parking/vehicle-parking.component';

export interface Vehicle {
  id?: string | number;
  plate: string; // Biển số
  route: string; // Tên tuyến
  driver?: string; // Tên lái xe
  status?: 'active' | 'idle' | 'offline'; // Trạng thái
  location?: string; // Vị trí hiện tại (tạm mô tả)
  lastUpdate?: string; // ISO datetime hoặc chuỗi hiển thị
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Danh sách phương tiện</h2>
    <section class="vehicle-list">
      <header class="vl-header">
        <div class="vl-controls">
          <input
            class="form-control"
            [(ngModel)]="filter"
            placeholder="Tìm biển số, tuyến, lái xe..."
            aria-label="Tìm kiếm"
          />
          <select
            [(ngModel)]="statusFilter"
            aria-label="Lọc trạng thái"
            class="form-control"
          >
            <option value="">-- Tất cả trạng thái --</option>
            <option value="active">Hoạt động</option>
            <option value="idle">Đang chờ</option>
            <option value="offline">Mất kết nối</option>
          </select>
        </div>
      </header>

      <div class="vl-table-wrap">
        <table class="vl-table" role="table">
          <thead>
            <tr>
              <th (click)="toggleSort('plate')">
                Biển số <span class="sort">{{ sortIndicator('plate') }}</span>
              </th>
              <th (click)="toggleSort('route')">
                Tuyến <span class="sort">{{ sortIndicator('route') }}</span>
              </th>
              <th (click)="toggleSort('driver')">
                Lái xe <span class="sort">{{ sortIndicator('driver') }}</span>
              </th>
              <th (click)="toggleSort('status')">
                Trạng thái
                <span class="sort">{{ sortIndicator('status') }}</span>
              </th>
              <th>Vị trí đỗ xe</th>
              <th (click)="toggleSort('lastUpdate')">
                Cập nhật
                <span class="sort">{{ sortIndicator('lastUpdate') }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of filteredVehicles">
              <td class="plate">{{ v.plate }}</td>
              <td class="route">{{ v.route }}</td>
              <td class="driver">{{ v.driver || '—' }}</td>
              <td class="status">
                <span [class]="statusClass(v.status)">{{
                  statusLabel(v.status)
                }}</span>
              </td>
              <td class="location">
                <a href="#" (click)="onAddTab('Vị trí đỗ xe', parking); $event.preventDefault()"
                  >Vị trí</a
                >
              </td>
              <td class="update">
                {{ v.lastUpdate ? (v.lastUpdate | date : 'short') : '—' }}
              </td>
            </tr>
            <tr *ngIf="filteredVehicles.length === 0">
              <td colspan="6" class="no-data">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="vl-footer">
        <small
          >Hiển thị <strong>{{ filteredVehicles.length }}</strong> phương
          tiện</small
        >
      </footer>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Roboto, Arial, sans-serif;
      }
      .vehicle-list {
        border: 1px solid #e3e3e3;
        border-radius: 8px;
        padding: 12px;
        background: #fff;
      }
      .vl-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .vl-header h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .vl-controls {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .vl-controls input {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        min-width: 220px;
      }
      .vl-controls select {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
      }
      .vl-table-wrap {
        overflow-x: auto;
        margin-top: 12px;
      }
      .vl-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 700px;
      }
      .vl-table thead th {
        text-align: left;
        padding: 8px 10px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
      }
      .vl-table tbody td {
        padding: 10px;
        border-top: 1px solid #f1f1f1;
        vertical-align: middle;
      }
      .vl-table tbody tr:hover {
        background: #fafafa;
      }
      .no-data {
        text-align: center;
        padding: 18px;
        color: #777;
      }

      .status {
        font-weight: 600;
      }
      .status.active {
        color: #155724;
        background: #d4edda;
        padding: 4px 8px;
        border-radius: 6px;
        display: inline-block;
      }
      .status.idle {
        color: #856404;
        background: #fff3cd;
        padding: 4px 8px;
        border-radius: 6px;
        display: inline-block;
      }
      .status.offline {
        color: #721c24;
        background: #f8d7da;
        padding: 4px 8px;
        border-radius: 6px;
        display: inline-block;
      }

      .vl-footer {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        color: #666;
      }
      .sort {
        font-size: 0.8rem;
        color: #999;
        margin-left: 6px;
      }

      /* Responsive tweaks */
      @media (max-width: 640px) {
        .vl-controls input {
          min-width: 120px;
        }
        .vl-table {
          min-width: 600px;
        }
      }
    `,
  ],
})
export class VehicleManagementComponent {
  vehicles: Vehicle[] = [
    {
      id: 1,
      plate: '51A-123.45',
      route: 'Route1',
      driver: 'Nguyễn Văn A',
      status: 'active',
      location: 'Vị trí',
      lastUpdate: new Date().toISOString(),
    },
    {
      id: 2,
      plate: '29B-999.01',
      route: 'Route2',
      driver: 'Trần Thị B',
      status: 'idle',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 3,
      plate: '30C-888.77',
      route: 'Route3',
      driver: 'Lê Văn C',
      status: 'offline',
      location: 'Vị trí',
      lastUpdate: '',
    },
    {
      id: 4,
      plate: '47D-555.12',
      route: 'Route4',
      driver: 'Phạm Thị D',
      status: 'active',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 5,
      plate: '51F-321.00',
      route: 'Route5',
      driver: 'Hoàng Văn E',
      status: 'idle',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 6,
      plate: '60A-111.99',
      route: 'Route6',
      driver: 'Ngô Thị F',
      status: 'active',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
    {
      id: 7,
      plate: '29H-222.33',
      route: 'Route7',
      driver: 'Võ Văn G',
      status: 'offline',
      location: 'Vị trí',
      lastUpdate: '',
    },
    {
      id: 8,
      plate: '34B-444.55',
      route: 'Route8',
      driver: 'Trần Văn H',
      status: 'active',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 9,
      plate: '72C-777.88',
      route: 'Route9',
      driver: 'Lý Thị I',
      status: 'idle',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 10,
      plate: '81D-999.10',
      route: 'Route10',
      driver: 'Đặng Văn K',
      status: 'active',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: 11,
      plate: '55E-123.66',
      route: 'Route11',
      driver: 'Phan Thị L',
      status: 'idle',
      location: 'Vị trí',
      lastUpdate: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: 12,
      plate: '66F-987.65',
      route: 'Route12',
      driver: 'Nguyễn Văn M',
      status: 'offline',
      location: 'Vị trí',
      lastUpdate: '',
    },
  ];
  @Input() dynamicTabs!: any;
  parking = VehicleParkingComponent;
  filter = '';
  statusFilter: '' | 'active' | 'idle' | 'offline' | '' = '';

  sortKey: keyof Vehicle | null = 'plate';
  sortDir: 1 | -1 = 1;

  get filteredVehicles(): Vehicle[] {
    const q = this.filter.trim().toLowerCase();

    let list = (this.vehicles || []).filter((v) => {
      if (this.statusFilter && v.status !== this.statusFilter) return false;
      if (!q) return true;
      return (
        (v.plate || '').toLowerCase().includes(q) ||
        (v.route || '').toLowerCase().includes(q) ||
        (v.driver || '').toLowerCase().includes(q) ||
        (v.location || '').toLowerCase().includes(q)
      );
    });

    if (this.sortKey) {
      list = list
        .slice()
        .sort(
          (a, b) =>
            this.compare(a[this.sortKey!], b[this.sortKey!]) * this.sortDir
        );
    }

    return list;
  }

  private compare(a: any, b: any): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;

    const aDate = Date.parse(a);
    const bDate = Date.parse(b);
    if (!isNaN(aDate) && !isNaN(bDate)) {
      return aDate - bDate;
    }

    const sa = String(a).toLowerCase();
    const sb = String(b).toLowerCase();
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    return 0;
  }

  toggleSort(key: keyof Vehicle) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 1 ? -1 : 1;
    } else {
      this.sortKey = key;
      this.sortDir = 1;
    }
  }

  sortIndicator(key: keyof Vehicle) {
    if (this.sortKey !== key) return '';
    return this.sortDir === 1 ? '▲' : '▼';
  }

  statusLabel(s?: Vehicle['status']) {
    switch (s) {
      case 'active':
        return 'Hoạt động';
      case 'idle':
        return 'Đang chờ';
      case 'offline':
        return 'Mất kết nối';
      default:
        return '—';
    }
  }

  statusClass(s?: Vehicle['status']) {
    return 'status ' + (s || '');
  }

  openLocation(v: Vehicle) {
    if (!v || !v.location) return;
    try {
      const q = encodeURIComponent(v.location);
      window.open(
        'https://www.google.com/maps/search/?api=1&query=' + q,
        '_blank'
      );
    } catch (e) {
      console.error('Không thể mở vị trí', e);
    }
  }
  onAddTab(title: string, content: Type<any>) {
    const newId = 'tab_' + Math.random().toString(36).substring(2, 7);
    const existing: number = this.dynamicTabs.tabs.findIndex(
      (t: Tab<Type<any>>) => t.title === title
    );
    this.dynamicTabs.tabs.forEach((t: Tab<Type<any>>) => (t.active = false));
    if (existing > -1) {
      this.dynamicTabs.tabs.splice(existing, 1);
    }
    this.dynamicTabs.tabs = [
      ...this.dynamicTabs.tabs,
      {
        id: newId,
        title,
        content,
        active: true,
        passTabs: true,
      },
    ];
    this.dynamicTabs.onTabsChanged();
    const navlinks = document.querySelectorAll('mat-nav-list>a');
    navlinks.forEach((link) => {
      const isActive = link.getAttribute('data-tab-name') === title;
      link.classList.toggle('active', isActive);
    });
  }
}
