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
  selector: 'app-route-types',
  templateUrl: './route-types.component.html',
  styleUrls: ['./route-types.component.css'],
  imports: [
    TabulatorTableSingleComponent,
    FontAwesomeModule,
    NgxSelectModule,
    FormsModule,
  ],
})
export class RouteTypesComponent implements OnInit {
  //#region Properties
  routeTypes: TreeNode[] = [
    {
      Id: 1,
      RouteTypesCode: 'IN',
      RouteTypesName: 'Inner Haiphong',
    },
    {
      Id: 2,
      RouteTypesCode: 'SUB',
      RouteTypesName: 'Suburban Haiphong',
    },
    {
      Id: 3,
      RouteTypesCode: 'OTHER',
      RouteTypesName: 'Other provinces',
    },
  ];
  columnNames: ColumnDefinition[] = [
    { title: 'Code', field: 'RouteTypesCode', width: 200 },
    { title: 'Name', field: 'RouteTypesName', widthGrow: 1 },
  ];
  areaFormValue: RouteTypes = new RouteTypes();
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
    const selected = this.tblComp.getSelectedRow() as RouteTypes;
    if (isEditing && !selected) return;
    this.areaFormValue = isEditing ? new RouteTypes(selected) : new RouteTypes();
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
class RouteTypes {
  public Id: number = 0;
  public RouteTypesCode: string = '';
  public RouteTypesName: string = '';
  public ParentId: number | undefined;
  constructor(init?: Partial<RouteTypes>) {
    Object.assign(this, init);
  }
}
