import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faPenToSquare,
  faCopy,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ColumnDefinition } from 'tabulator-tables';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  imports: [
    TabulatorTableSingleComponent,
    FontAwesomeModule,
    NgxSelectModule,
    FormsModule,
  ],
})
export class LocationsComponent implements OnInit {
  //#region Properties
  locations: TreeNode[] = [
    {
      Id: 1,
      LocationCode: 'SUB',
      LocationName: 'VH.Subsidiary',
    },
    {
      Id: 2,
      LocationCode: 'PARENT',
      LocationName: 'VH.ParentCompany',
    },
    {
      Id: 3,
      LocationCode: 'CUSTOMER',
      LocationName: 'Customer company',
    },
  ];
  columnNames: ColumnDefinition[] = [
    { title: 'Code', field: 'LocationCode', width: 200 },
    { title: 'Name', field: 'LocationName', widthGrow: 1 },
  ];
  areaFormValue: Locations = new Locations();
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  @ViewChild('tblComp', { static: false })
  tblComp!: TabulatorTableSingleComponent;
  @ViewChild('btnDelete', { static: false })
  btnDelete!: ElementRef<HTMLButtonElement>;
  //#endregion

  //#region Constructor
  constructor(private modalService: NgbModal) {}
  //#endregion

  //#region Life cycle
  ngOnInit() {}
  //#endregion

  openModal(content: TemplateRef<any>, isEditing = false) {
    const selected = this.tblComp.getSelectedRow() as Locations;
    if (isEditing && !selected) return;
    this.areaFormValue = isEditing ? new Locations(selected) : new Locations();
    this.modalService.open(content, {
      centered: true,
      modalDialogClass: 'w-50',
    });
  }
}
interface TreeNode {
  Id: number;
  ParentId?: number;
  [key: string]: any;
  children?: TreeNode[];
}
class Locations {
  public Id: number = 0;
  public LocationCode: string = '';
  public LocationName: string = '';
  public ParentId: number | undefined;
  constructor(init?: Partial<Locations>) {
    Object.assign(this, init);
  }
}
