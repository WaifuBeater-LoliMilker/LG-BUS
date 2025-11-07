import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCopy,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ColumnDefinition } from 'tabulator-tables';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgxSelectModule } from 'ngx-select-ex';
import { AddEditBusComponent } from '../add-edit-bus/add-edit-bus.component';
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';

@Component({
  selector: 'communication',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  imports: [
    FontAwesomeModule,
    TabulatorTableSingleComponent,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgxSelectModule,
  ],
})
export class BusComponent implements OnInit, AfterViewInit {
  //#region Properties
  isShowingRightTable = false;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  addEditBus = AddEditBusComponent;
  masterColumns: ColumnDefinition[] = [
    {
      title: 'No',
      field: 'no',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 75,
    },
    {
      title: 'Details',
      headerSort: false,
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 100,
      formatter: (cell) => {
        return `<button class="btn btn-primary"><i class="bi bi-eye-fill"></i></button>`;
      },
      cellClick: (e, cell) => {
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
          this.isShowingRightTable = true;
        }
      },
    },
    {
      title: 'Area',
      field: 'area',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Route Name',
      field: 'routeName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<a class="route-name">${value}</a>`;
      },
      width: 180,
    },
    {
      title: 'Trip Name',
      field: 'turnName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Note',
      field: 'note',
      headerHozAlign: 'center',
    },
  ];

  detailColumns: ColumnDefinition[] = [
    {
      title: 'No',
      field: 'no',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 75,
    },
    {
      title: 'Stop name',
      field: 'busStopName',
      headerHozAlign: 'center',
      width: 430,
    },
    {
      title: 'Arrive time',
      field: 'arriveTime',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 430,
    },
  ];

  modalDetailColumns: ColumnDefinition[] = [
    {
      title: 'Order',
      field: 'SortOrder',
      headerHozAlign: 'center',
      hozAlign: 'center',
      editable: true,
      editor: true,
      width: 80,
    },
    {
      title: 'Name',
      field: 'ParamKey',
      headerHozAlign: 'center',
      editable: true,
      editor: true,
      width: 150,
    },
    {
      title: 'Data Type',
      field: 'DataType',
      headerHozAlign: 'center',
      editable: true,
      editor: true,
      width: 150,
    },
    {
      title: 'Required',
      field: 'IsRequired',
      headerHozAlign: 'center',
      formatter: 'tickCross',
      hozAlign: 'center',
      cellClick: function (_, cell) {
        const currentValue = cell.getValue();
        cell.setValue(!currentValue);
      },
    },
    {
      title: 'Description',
      field: 'Description',
      headerHozAlign: 'center',
      editable: true,
      editor: true,
      widthGrow: 1,
    },
  ];

  masterData = [
    {
      no: 1,
      area: 'Hanoi - Center',
      routeName: 'Route 01',
      turnName: 'Morning Trip',
      note: 'Runs daily',
    },
    {
      no: 2,
      area: 'Hanoi - Center',
      routeName: 'Route 01',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 3,
      area: 'Hanoi - Cau Giay',
      routeName: 'Route 02',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 4,
      area: 'Hanoi - Cau Giay',
      routeName: 'Route 02',
      turnName: 'Afternoon Trip',
      note: 'Bypass road',
    },
    {
      no: 5,
      area: 'Hanoi - Thanh Xuan',
      routeName: 'Route 03',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 6,
      area: 'Hanoi - Thanh Xuan',
      routeName: 'Route 03',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 7,
      area: 'Hanoi - Hoan Kiem',
      routeName: 'Route 04',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 8,
      area: 'Hanoi - Hoan Kiem',
      routeName: 'Route 04',
      turnName: 'Afternoon Trip',
      note: 'Frequent traffic jam',
    },
    {
      no: 9,
      area: 'Hanoi - Hai Ba Trung',
      routeName: 'Route 05',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 10,
      area: 'Hanoi - Hai Ba Trung',
      routeName: 'Route 05',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 11,
      area: 'Hanoi - Long Bien',
      routeName: 'Route 06',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 12,
      area: 'Hanoi - Long Bien',
      routeName: 'Route 06',
      turnName: 'Afternoon Trip',
      note: 'Passes Chuong Duong Bridge',
    },
    {
      no: 13,
      area: 'Hanoi - Tay Ho',
      routeName: 'Route 07',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 14,
      area: 'Hanoi - Tay Ho',
      routeName: 'Route 07',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 15,
      area: 'Hanoi - Dong Da',
      routeName: 'Route 08',
      turnName: 'Morning Trip',
      note: 'Many students',
    },
    {
      no: 16,
      area: 'Hanoi - Dong Da',
      routeName: 'Route 08',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 17,
      area: 'Hanoi - Nam Tu Liem',
      routeName: 'Route 09',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 18,
      area: 'Hanoi - Nam Tu Liem',
      routeName: 'Route 09',
      turnName: 'Afternoon Trip',
      note: '',
    },
    {
      no: 19,
      area: 'Hanoi - Gia Lam',
      routeName: 'Route 10',
      turnName: 'Morning Trip',
      note: '',
    },
    {
      no: 20,
      area: 'Hanoi - Gia Lam',
      routeName: 'Route 10',
      turnName: 'Afternoon Trip',
      note: 'Final stop Gia Lam Bus Station',
    },
  ];

  detailData = [
    { no: 1, busStopName: 'My Dinh Bus Station', arriveTime: '06:30' },
    {
      no: 2,
      busStopName: 'Hanoi University of Science and Technology',
      arriveTime: '06:45',
    },
    { no: 3, busStopName: 'Nga Tu So', arriveTime: '07:00' },
    { no: 4, busStopName: 'Royal City', arriveTime: '07:10' },
    { no: 5, busStopName: 'Times City', arriveTime: '07:20' },
    { no: 6, busStopName: 'Cau Giay', arriveTime: '07:35' },
    { no: 7, busStopName: 'Trung Hoa', arriveTime: '07:45' },
    { no: 8, busStopName: 'Foreign Trade University', arriveTime: '07:55' },
    { no: 9, busStopName: 'Big C Thang Long', arriveTime: '08:05' },
    { no: 10, busStopName: 'Nga Tu Vong', arriveTime: '08:15' },
    { no: 11, busStopName: 'Thong Nhat Park', arriveTime: '08:25' },
    { no: 12, busStopName: 'Hanoi Railway Station', arriveTime: '08:35' },
    { no: 13, busStopName: 'Opera House', arriveTime: '08:45' },
    { no: 14, busStopName: 'Hoan Kiem Lake', arriveTime: '08:55' },
    { no: 15, busStopName: 'Giap Bat Bus Station', arriveTime: '09:10' },
    { no: 16, busStopName: 'Nuoc Ngam Bus Station', arriveTime: '09:25' },
    { no: 17, busStopName: 'Linh Dam Urban Area', arriveTime: '09:35' },
    { no: 18, busStopName: 'Nga Tu So (return)', arriveTime: '09:50' },
    {
      no: 19,
      busStopName: 'National Economics University',
      arriveTime: '10:00',
    },
    { no: 20, busStopName: 'Gia Lam Bus Station', arriveTime: '10:20' },
  ];

  @ViewChild('tblMaster', { static: false })
  tblMaster!: TabulatorTableSingleComponent;
  @ViewChild('tblDetail', { static: false })
  tblDetail!: TabulatorTableSingleComponent;
  @ViewChild('btnDeleteMaster', { static: false })
  btnDeleteMaster!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnDeleteDetail', { static: false })
  btnDeleteDetail!: ElementRef<HTMLButtonElement>;
  @Input() dynamicTabs!: any;
  //#endregion

  //#region Constructor
  constructor() {}
  //#endregion

  //#region Life cycle
  ngOnInit() {}
  ngAfterViewInit() {}
  //#endregion
  onDetailClosed() {
    this.isShowingRightTable = false;
    this.tblMaster.table?.deselectRow();
  }
  onDetailOpened() {
    this.tblDetail.table?.redraw(true);
  }
  onAddTab(title: string, content: Type<any>) {
    const newId = 'tab_' + Math.random().toString(36).substring(2, 7);
    const existing = this.dynamicTabs.tabs.find(
      (t: Tab<Type<any>>) => t.title === title
    );
    this.dynamicTabs.tabs.forEach((t: Tab<Type<any>>) => (t.active = false));
    if (existing) {
      existing.active = true;
    } else {
      this.dynamicTabs.tabs = [
        ...this.dynamicTabs.tabs,
        {
          id: newId,
          title,
          content,
          active: true,
        },
      ];
      this.dynamicTabs.onTabsChanged();
    }
    const navlinks = document.querySelectorAll('mat-nav-list>a');
    navlinks.forEach((link) => {
      const isActive = link.getAttribute('data-tab-name') === title;
      link.classList.toggle('active', isActive);
    });
  }
  confirmDelete() {
    confirm('Confirm?');
  }
}
