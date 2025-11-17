import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
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
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { BusRouteMap } from '../bus-route-map/bus-route-map.component';
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbTimepickerModule,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';

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
    NgbDatepickerModule,
    NgbTimepickerModule,
    BusRouteMap,
  ],
})
export class BusComponent implements OnInit, AfterViewInit {
  //#region Properties
  isShowingRightTable = false;
  isEditting = false;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  @ViewChild(BusRouteMap) mapComponent!: BusRouteMap;
  @ViewChild('arriveTimeInputTemplate', { static: true })
  arriveTimeInputTemplate!: TemplateRef<any>;
  @ViewChild('offsetDurationInputTemplate', { static: true })
  offsetDurationInputTemplate!: TemplateRef<any>;
  @ViewChild('vcHost', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;
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
          this.currentRoute = {
            no: 21,
            area: '',
            routeName: '',
            turnName: '',
            note: '',
            vehicleList:
              '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
          };
          this.detailData = [];
          this.isShowingRightTable = true;
          this.isEditting = false;
        }
      },
      formatter: function (cell, formatterParams, onRendered) {
        return `
        <button class="btn btn-success-alt btn-sm btn-edit"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger btn-sm btn-del"><i class="bi bi-trash"></i></button>
      `;
      },
      cellClick: (e, cell) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).closest('.btn-edit')) {
          this.currentRoute = cell.getData() as RouteInfo;
          this.detailData = [
            {
              SortOrder: 1,
              StopName: 'Điểm dừng 1',
              ArriveTime: { hour: 7, minute: 0, second: 0 },
              OffsetDuration: { hour: 0, minute: 5, second: 0 },
              lat: 21.06,
              lng: 105.84,
            },
            {
              SortOrder: 2,
              StopName: 'Điểm dừng 2',
              ArriveTime: { hour: 7, minute: 5, second: 0 },
              OffsetDuration: { hour: 0, minute: 7, second: 0 },
              lat: 21.0535,
              lng: 105.842,
            },
            {
              SortOrder: 3,
              StopName: 'Điểm dừng 3',
              ArriveTime: { hour: 7, minute: 12, second: 0 },
              OffsetDuration: { hour: 0, minute: 4, second: 0 },
              lat: 21.045,
              lng: 105.846,
            },
            {
              SortOrder: 4,
              StopName: 'Điểm dừng 4',
              ArriveTime: { hour: 7, minute: 16, second: 0 },
              OffsetDuration: { hour: 0, minute: 6, second: 0 },
              lat: 21.036,
              lng: 105.8435,
            },
            {
              SortOrder: 5,
              StopName: 'Điểm dừng 5',
              ArriveTime: { hour: 7, minute: 22, second: 0 },
              OffsetDuration: { hour: 0, minute: 5, second: 0 },
              lat: 21.02,
              lng: 105.841,
            },
            {
              SortOrder: 6,
              StopName: 'Điểm dừng 6',
              ArriveTime: { hour: 7, minute: 27, second: 0 },
              OffsetDuration: { hour: 0, minute: 6, second: 0 },
              lat: 21.0175,
              lng: 105.844,
            },
            {
              SortOrder: 7,
              StopName: 'Điểm dừng 7',
              ArriveTime: { hour: 7, minute: 33, second: 0 },
              OffsetDuration: { hour: 0, minute: 4, second: 0 },
              lat: 21.007,
              lng: 105.8415,
            },
            {
              SortOrder: 8,
              StopName: 'Điểm dừng 8',
              ArriveTime: { hour: 7, minute: 37, second: 0 },
              OffsetDuration: { hour: 0, minute: 8, second: 0 },
              lat: 20.9975,
              lng: 105.845,
            },
          ];
          this.isShowingRightTable = true;
          this.isEditting = true;
        }
        if ((e.target as HTMLElement).closest('.btn-del')) {
        }
      },
    },
    // {
    //   title: 'Area',
    //   field: 'area',
    //   headerHozAlign: 'center',
    //   hozAlign: 'center',
    //   width: 180,
    // },
    {
      title: 'Tên tuyến',
      field: 'routeName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<a class="route-name cursor-pointer">${value}</a>`;
      },
      width: 180,
    },
    {
      title: 'Loại tuyến',
      field: 'turnName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Danh sách xe',
      field: 'vehicleList',
      formatter: 'html',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Ghi chú',
      field: 'note',
      headerHozAlign: 'center',
    },
  ];
  detailColumns: ColumnDefinition[] = [
    {
      title: 'STT',
      field: 'SortOrder',
      headerHozAlign: 'center',
      hozAlign: 'center',
      editable: true,
      editor: true,
      width: 80,
      cellEdited: (cell) => {
        const table = cell.getTable();
        table.setSort('SortOrder', 'asc');
        this.mapComponent.onRefreshMap(
          this.detailData.sort((a, b) => {
            if (+a.SortOrder < +b.SortOrder) return -1;
            if (+a.SortOrder > +b.SortOrder) return 1;
            return 0;
          })
        );
      },
    },
    {
      title: 'Actions',
      field: 'actions',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 75,
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
          this.detailData.unshift({
            SortOrder: 0,
            StopName: '',
            ArriveTime: { hour: 0, minute: 0, second: 0 },
            OffsetDuration: { hour: 0, minute: 0, second: 0 },
            lat: 21.024,
            lng: 105.8436,
          });
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
          const data = cell.getData() as RouteDetail;
          const idx = this.detailData.findIndex(
            (d) => d.SortOrder == data.SortOrder && d.StopName == data.StopName
          );
          this.detailData.splice(idx, 1);
        }
      },
    },
    {
      title: 'Tên điểm dừng',
      field: 'StopName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      editable: true,
      editor: true,
      cellEdited: (cell) => {
        this.mapComponent.onRefreshMap(this.detailData);
      },
    },
    {
      title: 'TG đón',
      field: 'ArriveTime',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const container = document.createElement('div');
        const rowData = cell.getRow().getData();
        const view = this.vcr.createEmbeddedView(this.arriveTimeInputTemplate, {
          row: rowData,
        });
        view.rootNodes.forEach((node) => container.appendChild(node));
        return container;
      },
    },
    {
      title: 'Offset',
      field: 'OffsetDuration',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const container = document.createElement('div');
        const rowData = cell.getRow().getData();
        const view = this.vcr.createEmbeddedView(
          this.offsetDurationInputTemplate,
          {
            row: rowData,
          }
        );
        view.rootNodes.forEach((node) => container.appendChild(node));
        return container;
      },
    },
  ];
  currentRoute: RouteInfo = {
    no: 21,
    area: '',
    routeName: '',
    turnName: '',
    note: '',
    vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
  };
  masterData: RouteInfo[] = [
    {
      no: 1,
      area: 'Hà Nội - Trung Tâm',
      routeName: 'Tuyến 01',
      turnName: 'Ca sáng',
      note: 'Chạy hằng ngày',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 2,
      area: 'Hà Nội - Trung Tâm',
      routeName: 'Tuyến 01',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 3,
      area: 'Hà Nội - Cầu Giấy',
      routeName: 'Tuyến 02',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 4,
      area: 'Hà Nội - Cầu Giấy',
      routeName: 'Tuyến 02',
      turnName: 'Ca chiều',
      note: 'Đi đường tránh',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 5,
      area: 'Hà Nội - Thanh Xuân',
      routeName: 'Tuyến 03',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 6,
      area: 'Hà Nội - Thanh Xuân',
      routeName: 'Tuyến 03',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 7,
      area: 'Hà Nội - Hoàn Kiếm',
      routeName: 'Tuyến 04',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 8,
      area: 'Hà Nội - Hoàn Kiếm',
      routeName: 'Tuyến 04',
      turnName: 'Ca chiều',
      note: 'Hay kẹt xe',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 9,
      area: 'Hà Nội - Hai Bà Trưng',
      routeName: 'Tuyến 05',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 10,
      area: 'Hà Nội - Hai Bà Trưng',
      routeName: 'Tuyến 05',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 11,
      area: 'Hà Nội - Long Biên',
      routeName: 'Tuyến 06',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 12,
      area: 'Hà Nội - Long Biên',
      routeName: 'Tuyến 06',
      turnName: 'Ca chiều',
      note: 'Đi qua cầu Chương Dương',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 13,
      area: 'Hà Nội - Tây Hồ',
      routeName: 'Tuyến 07',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 14,
      area: 'Hà Nội - Tây Hồ',
      routeName: 'Tuyến 07',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 15,
      area: 'Hà Nội - Đống Đa',
      routeName: 'Tuyến 08',
      turnName: 'Ca sáng',
      note: 'Nhiều học sinh',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 16,
      area: 'Hà Nội - Đống Đa',
      routeName: 'Tuyến 08',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 17,
      area: 'Hà Nội - Nam Từ Liêm',
      routeName: 'Tuyến 09',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 18,
      area: 'Hà Nội - Nam Từ Liêm',
      routeName: 'Tuyến 09',
      turnName: 'Ca chiều',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 19,
      area: 'Hà Nội - Gia Lâm',
      routeName: 'Tuyến 10',
      turnName: 'Ca sáng',
      note: '',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
    {
      no: 20,
      area: 'Hà Nội - Gia Lâm',
      routeName: 'Tuyến 10',
      turnName: 'Ca chiều',
      note: 'Điểm cuối: Bến xe Gia Lâm',
      vehicleList: '<a class="vehicle-list-link cursor-pointer">DS xe</a>',
    },
  ];
  detailData: RouteDetail[] = [];

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
    this.mapComponent.clearLayer();
  }
  onDetailOpened() {
    this.mapComponent.onRefreshMap(this.detailData);
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
class RouteInfo {
  no: number;
  area: string;
  routeName: string;
  turnName: string;
  note: string;
  vehicleList: string;

  constructor(data?: Partial<RouteInfo>) {
    this.no = data?.no ?? 0;
    this.area = data?.area ?? '';
    this.routeName = data?.routeName ?? '';
    this.turnName = data?.turnName ?? '';
    this.note = data?.note ?? '';
    this.vehicleList = data?.vehicleList ?? '';
  }
}
export interface RouteDetail {
  SortOrder: number;
  StopName: string;
  ArriveTime: NgbTimeStruct;
  OffsetDuration: NgbTimeStruct;
  lat: number;
  lng: number;
}
