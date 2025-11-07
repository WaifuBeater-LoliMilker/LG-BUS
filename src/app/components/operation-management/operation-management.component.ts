import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
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
  NgbModal,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-operation-management',
  templateUrl: './operation-management.component.html',
  styleUrls: ['./operation-management.component.css'],
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
    MapComponent,
  ],
})
export class OperationManagementComponent implements OnInit {
  isShowingRightTable = false;
  time = { hour: 13, minute: 30 };
  faGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  faImport = faFileImport;
  faExport = faFileExport;
  map = MapComponent;
  @ViewChild('content', { static: false })
  modal!: TemplateRef<any>;
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  scheduleData: ScheduleRow[] = [
    {
      stt: 1,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Nội thành HP',
      diaDiem: 'TD PLAZA (FSE HP)',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Đã hoàn thành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 2,
      ngay: '2025-07-14',
      gio: '08:00',
      moTa: 'Về Ca đêm',
      khuVuc: 'Nội thành HP',
      diaDiem: 'TD PLAZA',
      nhaCungCap: 'Kumho',
      bienSo: '29LD-32022',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Đã hoàn thành',
      soLuong: 45,
      gps: 'GPS',
    },
    {
      stt: 3,
      ngay: '2025-07-14',
      gio: '18:00',
      moTa: 'Đi làm ca HC',
      khuVuc: 'Nội thành HP',
      diaDiem: 'CẦU RAO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 4,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca đêm',
      khuVuc: 'Nội thành HP',
      diaDiem: 'LẠCH TRAY (KTX HP)',
      nhaCungCap: 'Kumho',
      bienSo: '29H-93121',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 5,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca ngày',
      khuVuc: 'Nội thành HP',
      diaDiem: 'HỒ SEN (FSE HP)',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 6,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'MINH ĐỨC',
      nhaCungCap: 'Kumho',
      bienSo: '29LD-32771',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 7,
      ngay: '2025-07-14',
      gio: '08:00',
      moTa: 'Về Ca đêm',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN DƯƠNG',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 8,
      ngay: '2025-07-14',
      gio: '18:00',
      moTa: 'Đi làm ca HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN DƯƠNG',
      nhaCungCap: 'Kumho',
      bienSo: '29LD-32614',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 9,
      ngay: '2025-07-14',
      gio: '18:50',
      moTa: 'Đi làm ca đêm',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẦU ĐẦM',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 10,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca ngày',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẦU ĐẦM',
      nhaCungCap: 'Kumho',
      bienSo: '29H-93190',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Đã hoàn thành',
      soLuong: 36,
      gps: 'GPS',
    },
    {
      stt: 11,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẨM ĐIỀN',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 12,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẦU ĐẦM',
      nhaCungCap: 'Kumho',
      bienSo: '29H-93194',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 13,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca đêm',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẦU ĐẦM',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 14,
      ngay: '2025-07-14',
      gio: '18:00',
      moTa: 'Về ca HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'CẦU ĐẦM',
      nhaCungCap: 'Kumho',
      bienSo: '29LD-32734',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 15,
      ngay: '2025-07-14',
      gio: '18:50',
      moTa: 'Đi làm ca đêm',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 16,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca ngày',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG',
      nhaCungCap: 'Kumho',
      bienSo: '29H-89829',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 17,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG',
      nhaCungCap: 'Kumho',
      bienSo: '29H-89811',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Đã hoàn thành',
      soLuong: 38,
      gps: 'GPS',
    },
    {
      stt: 18,
      ngay: '2025-07-14',
      gio: '08:00',
      moTa: 'Về ca HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 19,
      ngay: '2025-07-14',
      gio: '18:50',
      moTa: 'Đi làm ca đêm',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG',
      nhaCungCap: 'Kumho',
      bienSo: '29H-00951',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 20,
      ngay: '2025-07-14',
      gio: '20:00',
      moTa: 'Về ca ngày',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'HÙNG THẮNG (KTX HP)',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 21,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '29LD-32778',
      tinhTrangSapXep: 'Đã sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 22,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 23,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 23,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 23,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 23,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
    {
      stt: 23,
      ngay: '2025-07-14',
      gio: '05:55',
      moTa: 'Đi làm ca ngày và HC',
      khuVuc: 'Ngoại thành HP',
      diaDiem: 'AN LÃO',
      nhaCungCap: 'Kumho',
      bienSo: '',
      tinhTrangSapXep: 'Chưa sắp xếp',
      tinhTrangVanHanh: 'Chưa vận hành',
      soLuong: undefined,
      gps: undefined,
    },
  ];
  constructor(private modalService: NgbModal) {}
  ngOnInit() {}
  openModal() {
    this.modalService.open(this.modal, {
      centered: true,
      modalDialogClass: 'modal-width',
      // fullscreen: true,
    });
  }
  sortedData: ScheduleRow[] = [...this.scheduleData];

  sortColumn: SortColumn = 'stt';
  sortDirection: SortDirection = 'asc';

  onSort(column: SortColumn) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortData();
  }

  private sortData() {
    if (this.sortDirection === '') {
      this.sortedData = [...this.scheduleData];
      return;
    }

    this.sortedData = [...this.scheduleData].sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      // Handle undefined/null values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return this.sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return this.sortDirection === 'asc' ? 1 : -1;

      // Handle different data types
      let result = 0;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue, 'vi', { sensitivity: 'base' });
      } else {
        // Fallback for mixed types
        result = String(aValue).localeCompare(String(bValue), 'vi', {
          sensitivity: 'base',
        });
      }

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  getSortClass(column: SortColumn): string {
    if (this.sortColumn !== column) {
      return 'sort-asc';
    }

    return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  // Handle GPS click
  onGpsClick() {
    this.isShowingRightTable = true;
  }
  onDetailOpened() {
    this.mapComponent.onRefreshMap();
  }
  onDetailClosed() {
    this.isShowingRightTable = false;
  }
}
export interface ScheduleRow {
  stt: number;
  ngay: string;
  gio: string;
  moTa: string;
  khuVuc: string;
  diaDiem: string;
  nhaCungCap: string;
  bienSo: string;
  tinhTrangSapXep: string;
  tinhTrangVanHanh: string;
  soLuong?: number;
  gps?: string;
}
export type SortColumn = keyof ScheduleRow;
export type SortDirection = 'asc' | 'desc' | '';
