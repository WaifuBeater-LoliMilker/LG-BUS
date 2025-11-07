import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { ColumnDefinition } from 'tabulator-tables';
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTimepickerModule,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-request-form-stop',
  templateUrl: './request-form-stop.component.html',
  styleUrls: ['./request-form-stop.component.css'],
  imports: [
    TabulatorTableSingleComponent,
    FontAwesomeModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class RequestFormStopComponent implements AfterViewInit {
  @ViewChild('table', { static: true }) tableEl!: ElementRef;
  @ViewChild('table', { static: false })
  tblMaster!: TabulatorTableSingleComponent;
  @ViewChild('dateInputTemplate', { static: true })
  dateInputTemplate!: TemplateRef<any>;
  @ViewChild('timeInputTemplate', { static: true })
  timeInputTemplate!: TemplateRef<any>;
  @ViewChild('vcHost', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;

  isShowingRightTable = false;
  masterColumns: ColumnDefinition[] = [
    {
      title: 'No',
      field: 'no',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 75,
    },
    {
      title: 'Actions',
      field: 'actions',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 90,
      headerSort: false,
      titleFormatter: function (column, formatterParams, onRendered) {
        return `
            <div class="header-actions d-flex align-items-center justify-content-center">
              <button class="btn btn-primary-alt btn-sm btn-add"><i class="bi bi-plus-lg"></i></button>
            </div>
          `;
      },
      headerClick: (e, column) => {
        const btn = (e.target as HTMLElement).closest('.btn-add');
        if (btn) {
          this.isShowingRightTable = true;
        }
      },
      formatter: function (cell, formatterParams, onRendered) {
        return `
            <button class="btn btn-success-alt btn-sm btn-edit"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger btn-sm btn-del"><i class="bi bi-trash"></i></button>
          `;
      },
      cellClick: (e, cell) => {
        if ((e.target as HTMLElement).closest('.btn-edit')) {
          this.isShowingRightTable = true;
        }
        if ((e.target as HTMLElement).closest('.btn-del')) {
        }
      },
    },
    {
      title: 'Pickup date',
      field: 'pickupDate',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 150,
      formatter: (cell) => {
        const container = document.createElement('div');
        const rowData = cell.getRow().getData();
        const view = this.vcr.createEmbeddedView(this.dateInputTemplate, {
          row: rowData,
        });
        view.rootNodes.forEach((node) => container.appendChild(node));
        return container;
      },
      sorter: (a, b) => {
        if (!a && !b) return 0;
        if (!a) return -1;
        if (!b) return 1;
        const dateA = new Date(a.year, a.month - 1, a.day).getTime();
        const dateB = new Date(b.year, b.month - 1, b.day).getTime();
        return dateA - dateB;
      },
    },
    {
      title: 'Duration',
      field: 'duration',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 150,
      formatter: (cell) => {
        const container = document.createElement('div');
        const rowData = cell.getRow().getData();
        const view = this.vcr.createEmbeddedView(this.timeInputTemplate, {
          row: rowData,
        });
        view.rootNodes.forEach((node) => container.appendChild(node));
        return container;
      },
    },
    {
      title: 'Departure',
      field: 'departure',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 150,
    },
    {
      title: 'Arrival',
      field: 'arrival',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 150,
    },
    {
      title: 'Assigned number',
      field: 'assignedNumber',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 200,
    },
    {
      title: 'Note',
      field: 'note',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 200,
    },
  ];

  masterData: RowData[] = [
    {
      no: 1,
      pickupDate: { year: 2025, month: 9, day: 1 },
      pickupTime: '08:15',
      duration: { hour: 0, minute: 45, second: 0 },
      departure: 'Station A',
      arrival: 'Station B',
      assignedNumber: 'A101',
      note: 'Morning trip',
    },
    {
      no: 2,
      pickupDate: { year: 2025, month: 9, day: 2 },
      pickupTime: '09:30',
      duration: { hour: 0, minute: 50, second: 0 },
      departure: 'Station B',
      arrival: 'Station C',
      assignedNumber: 'A102',
      note: 'Regular service',
    },
    {
      no: 3,
      pickupDate: { year: 2025, month: 9, day: 3 },
      pickupTime: '07:45',
      duration: { hour: 0, minute: 40, second: 0 },
      departure: 'Station C',
      arrival: 'Station D',
      assignedNumber: 'A103',
      note: '',
    },
    {
      no: 4,
      pickupDate: { year: 2025, month: 9, day: 4 },
      pickupTime: '10:00',
      duration: { hour: 0, minute: 55, second: 0 },
      departure: 'Station D',
      arrival: 'Station E',
      assignedNumber: 'A104',
      note: 'Peak hour',
    },
    {
      no: 5,
      pickupDate: { year: 2025, month: 9, day: 5 },
      pickupTime: '06:20',
      duration: { hour: 0, minute: 35, second: 0 },
      departure: 'Station E',
      arrival: 'Station F',
      assignedNumber: 'A105',
      note: 'Early departure',
    },
    {
      no: 6,
      pickupDate: { year: 2025, month: 9, day: 6 },
      pickupTime: '12:15',
      duration: { hour: 1, minute: 0, second: 0 },
      departure: 'Station F',
      arrival: 'Station G',
      assignedNumber: 'A106',
      note: '',
    },
    {
      no: 7,
      pickupDate: { year: 2025, month: 9, day: 7 },
      pickupTime: '13:45',
      duration: { hour: 0, minute: 50, second: 0 },
      departure: 'Station G',
      arrival: 'Station H',
      assignedNumber: 'A107',
      note: 'Weekend',
    },
    {
      no: 8,
      pickupDate: { year: 2025, month: 9, day: 8 },
      pickupTime: '15:30',
      duration: { hour: 0, minute: 42, second: 0 },
      departure: 'Station H',
      arrival: 'Station I',
      assignedNumber: 'A108',
      note: '',
    },
    {
      no: 9,
      pickupDate: { year: 2025, month: 9, day: 9 },
      pickupTime: '17:10',
      duration: { hour: 0, minute: 48, second: 0 },
      departure: 'Station I',
      arrival: 'Station J',
      assignedNumber: 'A109',
      note: 'Evening trip',
    },
    {
      no: 10,
      pickupDate: { year: 2025, month: 9, day: 10 },
      pickupTime: '19:25',
      duration: { hour: 0, minute: 52, second: 0 },
      departure: 'Station J',
      arrival: 'Station K',
      assignedNumber: 'A110',
      note: '',
    },
    {
      no: 11,
      pickupDate: { year: 2025, month: 9, day: 11 },
      pickupTime: '20:40',
      duration: { hour: 1, minute: 5, second: 0 },
      departure: 'Station K',
      arrival: 'Station L',
      assignedNumber: 'A111',
      note: 'Late service',
    },
    {
      no: 12,
      pickupDate: { year: 2025, month: 9, day: 12 },
      pickupTime: '05:50',
      duration: { hour: 0, minute: 38, second: 0 },
      departure: 'Station L',
      arrival: 'Station M',
      assignedNumber: 'A112',
      note: '',
    },
    {
      no: 13,
      pickupDate: { year: 2025, month: 9, day: 13 },
      pickupTime: '07:05',
      duration: { hour: 0, minute: 47, second: 0 },
      departure: 'Station M',
      arrival: 'Station N',
      assignedNumber: 'A113',
      note: 'Morning rush',
    },
    {
      no: 14,
      pickupDate: { year: 2025, month: 9, day: 14 },
      pickupTime: '09:20',
      duration: { hour: 0, minute: 55, second: 0 },
      departure: 'Station N',
      arrival: 'Station O',
      assignedNumber: 'A114',
      note: '',
    },
    {
      no: 15,
      pickupDate: { year: 2025, month: 9, day: 15 },
      pickupTime: '11:35',
      duration: { hour: 1, minute: 0, second: 0 },
      departure: 'Station O',
      arrival: 'Station P',
      assignedNumber: 'A115',
      note: '',
    },
    {
      no: 16,
      pickupDate: { year: 2025, month: 9, day: 16 },
      pickupTime: '14:10',
      duration: { hour: 0, minute: 45, second: 0 },
      departure: 'Station P',
      arrival: 'Station Q',
      assignedNumber: 'A116',
      note: 'Express',
    },
    {
      no: 17,
      pickupDate: { year: 2025, month: 9, day: 17 },
      pickupTime: '16:25',
      duration: { hour: 0, minute: 53, second: 0 },
      departure: 'Station Q',
      arrival: 'Station R',
      assignedNumber: 'A117',
      note: '',
    },
    {
      no: 18,
      pickupDate: { year: 2025, month: 9, day: 18 },
      pickupTime: '18:40',
      duration: { hour: 0, minute: 49, second: 0 },
      departure: 'Station R',
      arrival: 'Station S',
      assignedNumber: 'A118',
      note: '',
    },
    {
      no: 19,
      pickupDate: { year: 2025, month: 9, day: 19 },
      pickupTime: '21:00',
      duration: { hour: 1, minute: 10, second: 0 },
      departure: 'Station S',
      arrival: 'Station T',
      assignedNumber: 'A119',
      note: 'Night service',
    },
    {
      no: 20,
      pickupDate: { year: 2025, month: 9, day: 20 },
      pickupTime: '22:15',
      duration: { hour: 0, minute: 55, second: 0 },
      departure: 'Station T',
      arrival: 'Station U',
      assignedNumber: 'A120',
      note: '',
    },
  ];
  ngAfterViewInit(): void {

  }
  onDetailClosed() {
    this.isShowingRightTable = false;
    this.tblMaster.table?.deselectRow();
  }
  onDetailOpened() {}
}
interface RowData {
  no: number;
  pickupDate: NgbDateStruct;
  pickupTime: string;
  duration: NgbTimeStruct;
  departure: string;
  arrival: string;
  assignedNumber: string;
  note: string;
}
