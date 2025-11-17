import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
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
export class ApprovalComponent implements OnInit {
  isShowingRightTable = false;
  time = { hour: 13, minute: 30 };
  faGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  faImport = faFileImport;
  faExport = faFileExport;
  @ViewChild('content', { static: false })
  modal!: TemplateRef<any>;
  constructor() {}
  onDetailClosed() {
    this.isShowingRightTable = false;
  }
  onDetailOpened() {}
  busRequestData: BusRequest[] = [
    {
      no: 1,
      status: 'Approved',
      registerNo: 'LICAR-R20250714332716',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'LGD',
      to: 'Hải phòng',
      requestDetails: 'Yêu cầu xe cho sự kiện kick-off ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'HR Team',
    },
    {
      no: 2,
      status: 'Approved',
      registerNo: 'LICAR-R20250714328505',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Hải Dương',
      to: 'Thanh Miện',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Trần Văn B',
      applicantDepartment: 'Business Support Section',
    },
    {
      no: 3,
      status: 'Rejected',
      registerNo: 'LICAR-R20250714328055',
      type: 'Yêu cầu mở tuyến mới',
      from: 'Thái Bình',
      to: 'Chân cầu vạt',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'Management Team',
    },
    {
      no: 4,
      status: 'Approved',
      registerNo: 'LICAR-R20250714329537',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Thái Bình',
      to: 'Tiên Hải',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Vũ Thị C',
      applicantDepartment: 'PO Development Team',
    },
    {
      no: 5,
      status: 'Rejected',
      registerNo: 'LICAR-R20250714330193',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'LGD',
      to: 'Hải Phòng',
      requestDetails: 'Yêu cầu xe cho sự kiện kick-off ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'HR Team',
    },
    {
      no: 6,
      status: 'Approved',
      registerNo: 'LICAR-R20250714326732',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Quảng Ninh',
      to: 'Vân Đồn',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Trần Văn B',
      applicantDepartment: 'Business Support Section',
    },
    {
      no: 7,
      status: 'Approved',
      registerNo: 'LICAR-R20250714320437',
      type: 'Yêu cầu mở tuyến mới',
      from: 'Thái Bình',
      to: 'Chân cầu vạt',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'Management Team',
    },
    {
      no: 8,
      status: 'Approved',
      registerNo: 'LICAR-R20250714307402',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Hải Dương',
      to: 'Gia Lộc',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Vũ Thị C',
      applicantDepartment: 'PO Development Team',
    },
    {
      no: 9,
      status: 'Approved',
      registerNo: 'LICAR-R20250714320546',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'LGD',
      to: 'Hải Phòng',
      requestDetails: 'Yêu cầu xe cho sự kiện kick-off ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'HR Team',
    },
    {
      no: 10,
      status: 'Approved',
      registerNo: 'LICAR-R2025071434654',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Thái Thụy',
      to: 'Thái Hưng',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Trần Văn B',
      applicantDepartment: 'Business Support Section',
    },
    {
      no: 11,
      status: 'Approved',
      registerNo: 'LICAR-R20250714317981',
      type: 'Yêu cầu mở tuyến mới',
      from: 'Thái Bình',
      to: 'Chân cầu vạt',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Nguyễn Văn A',
      applicantDepartment: 'Management Team',
    },
    {
      no: 12,
      status: 'Approved',
      registerNo: 'LICAR-R2025071434885',
      type: 'Yêu cầu xe cho sự kiện',
      from: 'Hưng Hà',
      to: 'Ngã ba...',
      requestDetails: 'Yêu cầu thêm tuyến xe do tăng số lượng nhân viên ...',
      registerDate: '2025-08-19',
      scheduledDate: '2025-07-20',
      applicant: 'Vũ Thị C',
      applicantDepartment: 'PO Development Team',
    },
  ];

  sortedBusRequests: BusRequest[] = [];
  sortColumn: BusRequestSortColumn = 'no';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.sortBusRequestData();
  }

  onSort(column: BusRequestSortColumn) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortBusRequestData();
  }

  private sortBusRequestData() {
    this.sortedBusRequests = [...this.busRequestData].sort((a, b) => {
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

  getSortClass(column: BusRequestSortColumn): string {
    if (this.sortColumn !== column) {
      return '';
    }
    return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  getStatusClass(status: string): string {
    return status === 'Approved' ? 'status-approved' : 'status-rejected';
  }

  onRegisterNoClick() {
    this.isShowingRightTable = true;
  }
}
// bus-request.model.ts
export interface BusRequest {
  no: number;
  status: string;
  registerNo: string;
  type: string;
  from: string;
  to: string;
  requestDetails: string;
  registerDate: string;
  scheduledDate: string;
  applicant: string;
  applicantDepartment: string;
}

export type BusRequestSortColumn = keyof BusRequest;
