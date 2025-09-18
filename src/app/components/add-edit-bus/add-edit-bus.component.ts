import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { ColumnDefinition } from 'tabulator-tables';
import { faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
          <button class="btn btn-primary-alt btn-sm btn-add"><i class="bi bi-plus-lg"></i></button>
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
        <button class="btn btn-success-alt btn-sm btn-edit"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger btn-sm btn-del"><i class="bi bi-trash"></i></button>
      `;
      },
      cellClick: (e, cell) => {
        if ((e.target as HTMLElement).closest('.btn-edit')) {
          console.log('edit row', cell.getRow().getData());
          this.modalService.open(this.modal, {
            centered: true,
            fullscreen: true,
          });
        }
        if ((e.target as HTMLElement).closest('.btn-del')) {
          console.log('delete row', cell.getRow().getData());
        }
      },
    },
    {
      title: 'Stop name',
      field: 'busStopName',
      headerHozAlign: 'center',
      width: '50%',
    },
    {
      title: 'Arrive time',
      field: 'arriveTime',
      headerHozAlign: 'center',
      hozAlign: 'center',
      width: '50%',
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

  headerOptions = ['1', '2', '3'];
  faFloppy = faFloppyDisk;
  faBan = faBan;
  @ViewChild('tblDetail', { static: false })
  tblDetail!: TabulatorTableSingleComponent;
  @ViewChild('content', { static: false })
  modal!: TemplateRef<any>;
  @Input() dynamicTabs!: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
}
