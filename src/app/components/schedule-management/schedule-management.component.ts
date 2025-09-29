import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCopy,
  faFileExport,
  faFileImport,
  faList,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTable,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HorizontalScrollDirective } from '../../directives/horizontalScroll.directive';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.css'],
  imports: [
    FontAwesomeModule,
    NgbDropdownModule,
    HorizontalScrollDirective,
    NgxSelectModule,
  ],
})
export class ScheduleManagementComponent implements OnInit {
  faGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  faImport = faFileImport;
  faExport = faFileExport;
  faList = faList;
  faTable = faTable;
  isTableView = true;
  @ViewChild('content', { static: false })
  modal!: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}
  ngOnInit() {}
  openModal() {
    this.modalService.open(this.modal, {
      centered: true,
      modalDialogClass: 'w-50',
      // fullscreen: true,
    });
  }
}
