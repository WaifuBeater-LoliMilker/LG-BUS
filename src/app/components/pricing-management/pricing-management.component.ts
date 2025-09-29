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
import { INgxSelectOption, NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-pricing-management',
  templateUrl: './pricing-management.component.html',
  styleUrls: ['./pricing-management.component.css'],
  imports: [
    FontAwesomeModule,
    NgbDropdownModule,
    NgxSelectModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
  ],
})
export class PricingManagementComponent implements OnInit {
  isFirstType = true;
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
  constructor(private modalService: NgbModal) {}
  ngOnInit() {}
  openModal() {
    this.modalService.open(this.modal, {
      centered: true,
      modalDialogClass: 'w-50',
      // fullscreen: true,
    });
  }
  onSelectionChange(value: INgxSelectOption[]) {
    this.isFirstType = value[0].value == 'Lịch lẻ'
  }
}
