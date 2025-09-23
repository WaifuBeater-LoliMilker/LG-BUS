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
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  imports: [FontAwesomeModule, NgbDropdownModule, NgxSelectModule],
})
export class VehiclesComponent implements OnInit {
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
      modalDialogClass: 'w-75',
      // fullscreen: true,
    });
  }
}
