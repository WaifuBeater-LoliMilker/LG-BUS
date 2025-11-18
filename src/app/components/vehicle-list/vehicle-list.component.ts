import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { ScanHistoryComponent } from '../scan-history/scan-history.component';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { ColumnDefinition } from 'tabulator-tables';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  imports: [
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
export class VehicleListComponent implements OnInit {
  @Input() dynamicTabs!: any;
  scanHistory = ScanHistoryComponent;
  @ViewChild('tblDetail', { static: false })
  tblDetail!: TabulatorTableSingleComponent;
  isShowingRightTable = false;
  numberPlateSearch = '';
  driverSearch = '';
  numberPlateList = [
    '29H-93190',
    '29LD-32022',
    '30H-55218',
    '30A-77103',
    '88B-44291',
    '99H-11823',
    '29A-77234',
    '30G-11982',
    '36B-77219',
    '43C-55012',
    '29H-88721',
    '30H-66781',
    '72A-99311',
    '51G-44201',
    '29C-77812',
    '88H-34129',
    '99A-90214',
    '30B-66329',
    '29G-77190',
    '36H-55087',
  ];
  driverList: string[] = [
    'Nguyễn Văn A',
    'Trần Văn B',
    'Phạm Văn C',
    'Lê Văn D',
    'Hoàng Văn E',
    'Đỗ Văn F',
    'Phan Văn G',
    'Bùi Văn H',
    'Vũ Văn I',
    'Đinh Văn K',
    'Ngô Văn L',
    'Nguyễn Văn M',
    'Phạm Văn N',
    'Hoàng Văn O',
    'Đặng Văn P',
    'Trần Văn Q',
    'Lê Văn R',
    'Nguyễn Văn S',
    'Vũ Văn T',
    'Hoàng Văn U',
  ];
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
      width: 150,
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
          <button class="btn btn-danger btn-sm btn-del"><i class="bi bi-trash"></i></button>
        `;
      },
      cellClick: (e, cell) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).closest('.btn-del')) {
          const confirmed = confirm('Bạn có chắc chắn muốn xóa không?');
          if (!confirmed) return;
          const data = cell.getData() as any;
          const idx = this.masterData.findIndex((d) => d.bienSo == data.bienSo);
          this.masterData.splice(idx, 1);
        }
      },
    },
    {
      title: 'Biển số',
      field: 'bienSo',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<a class="cursor-pointer">${value}</a>`;
      },
      width: 180,
    },
    {
      title: 'Lái xe',
      field: 'laiXe',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Vị trí đỗ',
      field: 'viTriDo',
      formatter: 'html',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
      cellClick: (e, cell) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).closest('.vehicle-list-link')) {
        }
      },
    },
    {
      title: 'Lịch sử quẹt thẻ',
      field: 'lichSu',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: function (cell, formatterParams, onRendered) {
        return `
          <a class="cursor-pointer">Lịch sử</a>
        `;
      },
      cellClick: (e, cell) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).closest('.cursor-pointer')) {
          const data = cell.getData();
          this.onAddTab('Lịch sử quẹt thẻ', this.scanHistory, data);
        }
      },
      width: 180,
    },
    {
      title: 'Ghi chú',
      field: 'note',
      headerHozAlign: 'center',
    },
  ];
  masterData = [
    {
      no: 1,
      actions: null,
      bienSo: '29H-93190',
      laiXe: 'Nguyễn Văn A',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi A - Khu 1</a>',
      note: '',
    },
    {
      no: 2,
      actions: null,
      bienSo: '29LD-32022',
      laiXe: 'Trần Văn B',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi B - Khu 2</a>',
      note: '',
    },
    {
      no: 3,
      actions: null,
      bienSo: '30H-55218',
      laiXe: 'Phạm Văn C',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi C - Khu 3</a>',
      note: '',
    },
    {
      no: 4,
      actions: null,
      bienSo: '30A-77103',
      laiXe: 'Lê Văn D',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi A - Khu 4</a>',
      note: '',
    },
    {
      no: 5,
      actions: null,
      bienSo: '88B-44291',
      laiXe: 'Hoàng Văn E',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi D - Khu 5</a>',
      note: '',
    },
    {
      no: 6,
      actions: null,
      bienSo: '99H-11823',
      laiXe: 'Nguyễn Văn F',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi E - Khu 1</a>',
      note: '',
    },
    {
      no: 7,
      actions: null,
      bienSo: '29A-77234',
      laiXe: 'Trần Văn G',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi B - Khu 3</a>',
      note: '',
    },
    {
      no: 8,
      actions: null,
      bienSo: '30G-11982',
      laiXe: 'Phạm Văn H',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi C - Khu 2</a>',
      note: '',
    },
    {
      no: 9,
      actions: null,
      bienSo: '36B-77219',
      laiXe: 'Lê Văn I',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi D - Khu 3</a>',
      note: '',
    },
    {
      no: 10,
      actions: null,
      bienSo: '43C-55012',
      laiXe: 'Hoàng Văn K',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi A - Khu 5</a>',
      note: '',
    },
    {
      no: 11,
      actions: null,
      bienSo: '29H-88721',
      laiXe: 'Đỗ Văn L',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi E - Khu 4</a>',
      note: '',
    },
    {
      no: 12,
      actions: null,
      bienSo: '30H-66781',
      laiXe: 'Phan Văn M',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi C - Khu 1</a>',
      note: '',
    },
    {
      no: 13,
      actions: null,
      bienSo: '72A-99311',
      laiXe: 'Bùi Văn N',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi D - Khu 2</a>',
      note: '',
    },
    {
      no: 14,
      actions: null,
      bienSo: '51G-44201',
      laiXe: 'Vũ Văn O',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi B - Khu 4</a>',
      note: '',
    },
    {
      no: 15,
      actions: null,
      bienSo: '29C-77812',
      laiXe: 'Đinh Văn P',
      viTriDo: '<a class="vehicle-list-link cursor-pointer">Bãi A - Khu 3</a>',
      note: '',
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
      title: 'Biển số',
      field: 'bienSo',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 200,
    },
    {
      title: 'Lái xe',
      field: 'laiXe',
      headerHozAlign: 'center',
      hozAlign: 'center',
    },
  ];
  detailData: VehicleList[] = [
    { no: 1, bienSo: '29H-93190', laiXe: 'Nguyễn Văn A' },
    { no: 2, bienSo: '29LD-32022', laiXe: 'Trần Văn B' },
    { no: 3, bienSo: '30H-55218', laiXe: 'Phạm Văn C' },
    { no: 4, bienSo: '30A-77103', laiXe: 'Lê Văn D' },
    { no: 5, bienSo: '88B-44291', laiXe: 'Hoàng Văn E' },
    { no: 6, bienSo: '99H-11823', laiXe: 'Đỗ Văn F' },
    { no: 7, bienSo: '29A-77234', laiXe: 'Phan Văn G' },
    { no: 8, bienSo: '30G-11982', laiXe: 'Bùi Văn H' },
    { no: 9, bienSo: '36B-77219', laiXe: 'Vũ Văn I' },
    { no: 10, bienSo: '43C-55012', laiXe: 'Đinh Văn K' },
    { no: 11, bienSo: '29H-88721', laiXe: 'Ngô Văn L' },
    { no: 12, bienSo: '30H-66781', laiXe: 'Nguyễn Văn M' },
    { no: 13, bienSo: '72A-99311', laiXe: 'Phạm Văn N' },
    { no: 14, bienSo: '51G-44201', laiXe: 'Hoàng Văn O' },
    { no: 15, bienSo: '29C-77812', laiXe: 'Đặng Văn P' },
    { no: 16, bienSo: '88H-34129', laiXe: 'Trần Văn Q' },
    { no: 17, bienSo: '99A-90214', laiXe: 'Lê Văn R' },
    { no: 18, bienSo: '30B-66329', laiXe: 'Nguyễn Văn S' },
    { no: 19, bienSo: '29G-77190', laiXe: 'Vũ Văn T' },
    { no: 20, bienSo: '36H-55087', laiXe: 'Hoàng Văn U' },
  ];
  detailDataFiltered: VehicleList[] = [];

  constructor() {}

  ngOnInit() {
    this.detailDataFiltered = [...this.detailData];
  }
  onDetailOpened() {}
  onDetailClosed() {
    this.isShowingRightTable = false;
  }
  onSelectionChange(event: any) {
    this.detailDataFiltered =
      !this.numberPlateSearch && !this.driverSearch
        ? (this.detailDataFiltered = [...this.detailData])
        : [...this.detailData].filter(
            (d) =>
              d.bienSo == this.numberPlateSearch || d.laiXe == this.driverSearch
          );
  }
  onSave() {
    this.isShowingRightTable = false;
    const data = this.tblDetail.table?.getSelectedData()[0] as VehicleList;
    this.masterData.push({
      no: 21,
      actions: null,
      bienSo: data.bienSo,
      laiXe: data.laiXe,
      viTriDo: '',
      note: '',
    });
  }
  onAddTab(title: string, content: Type<any>, data: any) {
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
        inputs: {
          PlateNumber: data.bienSo,
          RouteName: '',
          FromDate: { year: 2025, month: 11, day: 17 },
          ToDate: { year: 2025, month: 11, day: 30 },
        },
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
interface VehicleList {
  no: number;
  bienSo: string;
  laiXe: string;
}
