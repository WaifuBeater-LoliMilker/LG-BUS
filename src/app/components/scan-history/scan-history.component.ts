import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCopy,
  faFileExport,
  faFileImport,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-scan-history',
  templateUrl: './scan-history.component.html',
  styleUrls: ['./scan-history.component.css'],
  imports: [
    FontAwesomeModule,
    NgbDropdownModule,
    NgxSelectModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class ScanHistoryComponent implements OnInit {
  faGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  faImport = faFileImport;
  faExport = faFileExport;
  cardHistoryData: CardHistory[] = [
    {
      id: 1,
      thoiGian: '05:55:23',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32022',
      maThe: 'HK001234',
      tenHanhKhach: 'Nguyễn Văn A',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route1',
      ghiChu: 'Lên xe',
    },
    {
      id: 2,
      thoiGian: '06:10:45',
      ngay: '2025-07-14',
      bienSoXe: '29H-93190',
      maThe: 'HK001235',
      tenHanhKhach: 'Trần Thị B',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route2',
      ghiChu: 'Lên xe',
    },
    {
      id: 3,
      thoiGian: '06:15:12',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32771',
      maThe: 'HK001236',
      tenHanhKhach: 'Lê Văn C',
      loaiThe: 'Học sinh',
      trangThai: 'Thành công',
      tenTuyen: 'Route3',
      ghiChu: 'Lên xe',
    },
    {
      id: 4,
      thoiGian: '06:20:33',
      ngay: '2025-07-14',
      bienSoXe: '29H-89811',
      maThe: 'HK001237',
      tenHanhKhach: 'Phạm Thị D',
      loaiThe: 'Lẻ',
      trangThai: 'Thành công',
      tenTuyen: 'Route4',
      ghiChu: 'Lên xe',
    },
    {
      id: 5,
      thoiGian: '06:25:18',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32614',
      maThe: 'HK001238',
      tenHanhKhach: 'Hoàng Văn E',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route5',
      ghiChu: 'Lên xe',
    },
    {
      id: 6,
      thoiGian: '06:30:44',
      ngay: '2025-07-14',
      bienSoXe: '29H-93194',
      maThe: 'HK001239',
      tenHanhKhach: 'Vũ Thị F',
      loaiThe: 'Học sinh',
      trangThai: 'Thành công',
      tenTuyen: 'Route6',
      ghiChu: 'Lên xe',
    },
    {
      id: 7,
      thoiGian: '06:35:27',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32778',
      maThe: 'HK001240',
      tenHanhKhach: 'Đặng Văn G',
      loaiThe: 'Tháng',
      trangThai: 'Thất bại',
      tenTuyen: 'Route7',
      ghiChu: 'Thẻ hết hạn',
    },
    {
      id: 8,
      thoiGian: '06:40:15',
      ngay: '2025-07-14',
      bienSoXe: '29H-89829',
      maThe: 'HK001241',
      tenHanhKhach: 'Mai Thị H',
      loaiThe: 'Lẻ',
      trangThai: 'Thành công',
      tenTuyen: 'Route8',
      ghiChu: 'Lên xe',
    },
    {
      id: 9,
      thoiGian: '06:45:39',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32734',
      maThe: 'HK001242',
      tenHanhKhach: 'Trần Văn I',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route9',
      ghiChu: 'Lên xe',
    },
    {
      id: 10,
      thoiGian: '06:50:22',
      ngay: '2025-07-14',
      bienSoXe: '29H-00951',
      maThe: 'HK001243',
      tenHanhKhach: 'Lê Thị K',
      loaiThe: 'Học sinh',
      trangThai: 'Thành công',
      tenTuyen: 'Route10',
      ghiChu: 'Lên xe',
    },
    {
      id: 11,
      thoiGian: '07:00:18',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32022',
      maThe: 'HK001244',
      tenHanhKhach: 'Phan Văn L',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route11',
      ghiChu: 'Lên xe',
    },
    {
      id: 12,
      thoiGian: '07:10:45',
      ngay: '2025-07-14',
      bienSoXe: '29H-93190',
      maThe: 'HK001245',
      tenHanhKhach: 'Nguyễn Thị M',
      loaiThe: 'Lẻ',
      trangThai: 'Thất bại',
      tenTuyen: 'Route12',
      ghiChu: 'Thẻ không hợp lệ',
    },
    {
      id: 13,
      thoiGian: '07:20:33',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32771',
      maThe: 'HK001246',
      tenHanhKhach: 'Hoàng Thị N',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route13',
      ghiChu: 'Lên xe',
    },
    {
      id: 14,
      thoiGian: '07:30:27',
      ngay: '2025-07-14',
      bienSoXe: '29H-89811',
      maThe: 'HK001247',
      tenHanhKhach: 'Vũ Văn O',
      loaiThe: 'Học sinh',
      trangThai: 'Thành công',
      tenTuyen: 'Route14',
      ghiChu: 'Lên xe',
    },
    {
      id: 15,
      thoiGian: '07:40:15',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32614',
      maThe: 'HK001248',
      tenHanhKhach: 'Đặng Thị P',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route15',
      ghiChu: 'Lên xe',
    },
    {
      id: 16,
      thoiGian: '08:05:33',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32022',
      maThe: 'HK001234',
      tenHanhKhach: 'Nguyễn Văn A',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route16',
      ghiChu: 'Xuống xe',
    },
    {
      id: 17,
      thoiGian: '08:15:22',
      ngay: '2025-07-14',
      bienSoXe: '29H-93190',
      maThe: 'HK001235',
      tenHanhKhach: 'Trần Thị B',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route17',
      ghiChu: 'Xuống xe',
    },
    {
      id: 18,
      thoiGian: '08:25:44',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32771',
      maThe: 'HK001236',
      tenHanhKhach: 'Lê Văn C',
      loaiThe: 'Học sinh',
      trangThai: 'Thành công',
      tenTuyen: 'Route18',
      ghiChu: 'Xuống xe',
    },
    {
      id: 19,
      thoiGian: '08:35:18',
      ngay: '2025-07-14',
      bienSoXe: '29H-89811',
      maThe: 'HK001237',
      tenHanhKhach: 'Phạm Thị D',
      loaiThe: 'Lẻ',
      trangThai: 'Thành công',
      tenTuyen: 'Route19',
      ghiChu: 'Xuống xe',
    },
    {
      id: 20,
      thoiGian: '08:45:39',
      ngay: '2025-07-14',
      bienSoXe: '29LD-32614',
      maThe: 'HK001238',
      tenHanhKhach: 'Hoàng Văn E',
      loaiThe: 'Tháng',
      trangThai: 'Thành công',
      tenTuyen: 'Route20',
      ghiChu: 'Xuống xe',
    },
  ];

  sortedCardHistory: CardHistory[] = [];
  sortColumn: CardHistorySortColumn = 'thoiGian';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.sortCardHistoryData();
  }

  onSort(column: CardHistorySortColumn) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortCardHistoryData();
  }

  private sortCardHistoryData() {
    this.sortedCardHistory = [...this.cardHistoryData].sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return this.sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return this.sortDirection === 'asc' ? 1 : -1;

      let result = 0;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue, 'vi', { sensitivity: 'base' });
      } else {
        result = String(aValue).localeCompare(String(bValue), 'vi', {
          sensitivity: 'base',
        });
      }

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  getSortClass(column: CardHistorySortColumn): string {
    if (this.sortColumn !== column) {
      return '';
    }
    return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  getStatusClass(trangThai: string): string {
    return trangThai === 'Thành công' ? 'status-success' : 'status-failed';
  }
}
export interface CardHistory {
  id: number;
  thoiGian: string;
  ngay: string;
  bienSoXe: string;
  maThe: string;
  tenHanhKhach: string;
  loaiThe: string;
  trangThai: string;
  tenTuyen: string;
  ghiChu?: string;
}

export type CardHistorySortColumn = keyof CardHistory;
