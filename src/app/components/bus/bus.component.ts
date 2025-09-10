import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
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
import { CellComponent, ColumnDefinition } from 'tabulator-tables';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { NgxSelectModule } from 'ngx-select-ex';

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
export class BusComponent implements OnInit {
  //#region Properties
  isShowingRightTable = true;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  masterColumns: ColumnDefinition[] = [
    {
      title: 'No',
      field: 'no',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 75,
    },
    {
      title: '',
      headerSort: false,
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 100,
      formatter: (cell) => {
        return `<button class="btn btn-primary"><i class="bi bi-eye-fill"></i></button>`;
      },
    },
    {
      title: 'Khu vực',
      field: 'area',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Tên tuyến',
      field: 'routeName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      formatter: (cell) => {
        const value = cell.getValue();
        return `<a href="/routes/${encodeURIComponent(value)}">${value}</a>`;
      },
      width: 180,
    },
    {
      title: 'Tên lượt',
      field: 'turnName',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: 180,
    },
    {
      title: 'Lưu ý',
      field: 'note',
      headerHozAlign: 'center',
    },
  ];
  detailColumns: ColumnDefinition[] = [
    { title: 'No', field: 'no', headerHozAlign: 'center', width: 75 },
    {
      title: 'Tên điểm đón',
      field: 'busStopName',
      headerHozAlign: 'center',
      width: '50%',
    },
    {
      title: 'Giờ đón điểm',
      field: 'arriveTime',
      headerHozAlign: 'center',
      width: '50%',
    },
  ];
  modalDetailColumns: ColumnDefinition[] = [
    {
      title: 'STT',
      field: 'SortOrder',
      headerHozAlign: 'center',
      hozAlign: 'center',
      editable: true,
      editor: true,
      width: 80,
    },
    {
      title: 'Tên',
      field: 'ParamKey',
      headerHozAlign: 'center',
      editable: true,
      editor: true,
      width: 150,
    },
    {
      title: 'Kiểu dữ liệu',
      field: 'DataType',
      headerHozAlign: 'center',
      editable: true,
      editor: true,
      width: 150,
    },
    {
      title: 'Bắt buộc',
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
      title: 'Mô tả',
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
      area: 'Hà Nội - Trung tâm',
      routeName: 'Tuyến 01',
      turnName: 'Lượt đi sáng',
      note: 'Chạy hàng ngày',
    },
    {
      no: 2,
      area: 'Hà Nội - Trung tâm',
      routeName: 'Tuyến 01',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 3,
      area: 'Hà Nội - Cầu Giấy',
      routeName: 'Tuyến 02',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 4,
      area: 'Hà Nội - Cầu Giấy',
      routeName: 'Tuyến 02',
      turnName: 'Lượt về chiều',
      note: 'Đi đường tránh',
    },
    {
      no: 5,
      area: 'Hà Nội - Thanh Xuân',
      routeName: 'Tuyến 03',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 6,
      area: 'Hà Nội - Thanh Xuân',
      routeName: 'Tuyến 03',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 7,
      area: 'Hà Nội - Hoàn Kiếm',
      routeName: 'Tuyến 04',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 8,
      area: 'Hà Nội - Hoàn Kiếm',
      routeName: 'Tuyến 04',
      turnName: 'Lượt về chiều',
      note: 'Kẹt xe thường xuyên',
    },
    {
      no: 9,
      area: 'Hà Nội - Hai Bà Trưng',
      routeName: 'Tuyến 05',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 10,
      area: 'Hà Nội - Hai Bà Trưng',
      routeName: 'Tuyến 05',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 11,
      area: 'Hà Nội - Long Biên',
      routeName: 'Tuyến 06',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 12,
      area: 'Hà Nội - Long Biên',
      routeName: 'Tuyến 06',
      turnName: 'Lượt về chiều',
      note: 'Đi qua cầu Chương Dương',
    },
    {
      no: 13,
      area: 'Hà Nội - Tây Hồ',
      routeName: 'Tuyến 07',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 14,
      area: 'Hà Nội - Tây Hồ',
      routeName: 'Tuyến 07',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 15,
      area: 'Hà Nội - Đống Đa',
      routeName: 'Tuyến 08',
      turnName: 'Lượt đi sáng',
      note: 'Nhiều học sinh',
    },
    {
      no: 16,
      area: 'Hà Nội - Đống Đa',
      routeName: 'Tuyến 08',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 17,
      area: 'Hà Nội - Nam Từ Liêm',
      routeName: 'Tuyến 09',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 18,
      area: 'Hà Nội - Nam Từ Liêm',
      routeName: 'Tuyến 09',
      turnName: 'Lượt về chiều',
      note: '',
    },
    {
      no: 19,
      area: 'Hà Nội - Gia Lâm',
      routeName: 'Tuyến 10',
      turnName: 'Lượt đi sáng',
      note: '',
    },
    {
      no: 20,
      area: 'Hà Nội - Gia Lâm',
      routeName: 'Tuyến 10',
      turnName: 'Lượt về chiều',
      note: 'Điểm cuối bến xe Gia Lâm',
    },
  ];
  detailData = [
    { no: 1, busStopName: 'Bến xe Mỹ Đình', arriveTime: '06:30' },
    { no: 2, busStopName: 'Trường Đại học Bách Khoa', arriveTime: '06:45' },
    { no: 3, busStopName: 'Ngã Tư Sở', arriveTime: '07:00' },
    { no: 4, busStopName: 'Royal City', arriveTime: '07:10' },
    { no: 5, busStopName: 'Times City', arriveTime: '07:20' },
    { no: 6, busStopName: 'Cầu Giấy', arriveTime: '07:35' },
    { no: 7, busStopName: 'Trung Hòa', arriveTime: '07:45' },
    { no: 8, busStopName: 'Trường Đại học Ngoại Thương', arriveTime: '07:55' },
    { no: 9, busStopName: 'Big C Thăng Long', arriveTime: '08:05' },
    { no: 10, busStopName: 'Ngã Tư Vọng', arriveTime: '08:15' },
    { no: 11, busStopName: 'Công viên Thống Nhất', arriveTime: '08:25' },
    { no: 12, busStopName: 'Ga Hà Nội', arriveTime: '08:35' },
    { no: 13, busStopName: 'Nhà hát Lớn', arriveTime: '08:45' },
    { no: 14, busStopName: 'Hồ Hoàn Kiếm', arriveTime: '08:55' },
    { no: 15, busStopName: 'Bến xe Giáp Bát', arriveTime: '09:10' },
    { no: 16, busStopName: 'Bến xe Nước Ngầm', arriveTime: '09:25' },
    { no: 17, busStopName: 'Khu đô thị Linh Đàm', arriveTime: '09:35' },
    { no: 18, busStopName: 'Ngã Tư Sở (lượt về)', arriveTime: '09:50' },
    {
      no: 19,
      busStopName: 'Trường Đại học Kinh tế Quốc dân',
      arriveTime: '10:00',
    },
    { no: 20, busStopName: 'Bến xe Gia Lâm', arriveTime: '10:20' },
  ];
  @ViewChild('btnDeleteMaster', { static: false })
  btnDeleteMaster!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnDeleteDetail', { static: false })
  btnDeleteDetail!: ElementRef<HTMLButtonElement>;
  //#endregion

  //#region Constructor
  constructor() {}
  //#endregion

  //#region Life cycle
  ngOnInit() {}
  //#endregion
}
