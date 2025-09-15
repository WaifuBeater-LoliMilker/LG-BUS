import { Component, Input, OnInit } from '@angular/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { ColumnDefinition } from 'tabulator-tables';
import { faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-edit-bus',
  imports: [NgxSelectModule, TabulatorTableSingleComponent, FontAwesomeModule],
  templateUrl: './add-edit-bus.component.html',
  styleUrls: ['./add-edit-bus.component.css'],
})
export class AddEditBusComponent implements OnInit {
  detailColumns: ColumnDefinition[] = [
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
        <button class="btn btn-primary-alt btn-sm"><i class="bi bi-plus-lg"></i></button>
      </div>
    `;
      },
      headerClick: function (e, column) {
        const btn = (e.target as HTMLElement).closest('.btn-add');
        if (btn) {
          console.log('header Add clicked for column:', column.getField());
        }
      },
      formatter: function (cell, formatterParams, onRendered) {
        return `
      <button class="btn btn-success-alt btn-sm"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
    `;
      },
      cellClick: function (e, cell) {
        if ((e.target as HTMLElement).closest('.btn-edit')) {
          console.log('edit row', cell.getRow().getData());
        }
        if ((e.target as HTMLElement).closest('.btn-del')) {
          console.log('delete row', cell.getRow().getData());
        }
      },
    },
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
      hozAlign: 'center',
      width: '50%',
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
  headerOptions = ['1', '2', '3'];
  faFloppy = faFloppyDisk;
  faBan = faBan;
  @Input() dynamicTabs!: any;

  constructor() {}

  ngOnInit() {}
}
