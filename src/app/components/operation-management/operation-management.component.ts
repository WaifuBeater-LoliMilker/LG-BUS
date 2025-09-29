import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  Type,
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
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModal,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { Tab } from '../_shared/dynamic-tabs/dynamic-tabs.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-operation-management',
  templateUrl: './operation-management.component.html',
  styleUrls: ['./operation-management.component.css'],
  imports: [
    FontAwesomeModule,
    NgbDropdownModule,
    NgxSelectModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MapComponent,
  ],
})
export class OperationManagementComponent implements OnInit {
  isShowingRightTable = false;
  time = { hour: 13, minute: 30 };
  faGlass = faMagnifyingGlass;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  faImport = faFileImport;
  faExport = faFileExport;
  map = MapComponent;
  @ViewChild('content', { static: false })
  modal!: TemplateRef<any>;
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  constructor(private modalService: NgbModal) {}
  ngOnInit() {}
  openModal() {
    this.modalService.open(this.modal, {
      centered: true,
      modalDialogClass: 'modal-width',
      // fullscreen: true,
    });
  }

  onDetailOpened() {
    this.mapComponent.onRefreshMap();
  }
  onDetailClosed() {
    this.isShowingRightTable = false;
  }
}
