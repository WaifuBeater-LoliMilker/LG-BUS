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
  selector: 'areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
  imports: [
    TabulatorTableSingleComponent,
    FontAwesomeModule,
    NgxSelectModule,
    FormsModule,
  ],
})
export class AreasComponent implements OnInit {
  //#region Properties
  areas: TreeNode[] = [
    {
      Id: 1,
      AreaCode: 'IN',
      AreaName: 'Inner Haiphong',
    },
    {
      Id: 2,
      AreaCode: 'SUB',
      AreaName: 'Suburban Haiphong',
    },
    {
      Id: 3,
      AreaCode: 'OTHER',
      AreaName: 'Other provinces',
    },
  ];
  columnNames: ColumnDefinition[] = [
    { title: 'Code', field: 'AreaCode', width: 200 },
    { title: 'Name', field: 'AreaName', widthGrow: 1 },
  ];
  areaFormValue: Areas = new Areas();
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faCopy = faCopy;
  faTrash = faTrash;
  @ViewChild('tblComp', { static: false })
  tblComp!: TabulatorTableSingleComponent;
  @ViewChild('btnDelete', { static: false })
  btnDelete!: ElementRef<HTMLButtonElement>;
  @Input() dynamicTabs!: any;
  //#endregion

  //#region Constructor
  constructor(private modalService: NgbModal) {}
  //#endregion

  //#region Life cycle
  ngOnInit() {}
  //#endregion

  openModal(content: TemplateRef<any>, isEditing = false) {
    const selected = this.tblComp.getSelectedRow() as Areas;
    if (isEditing && !selected) return;
    this.areaFormValue = isEditing ? new Areas(selected) : new Areas();
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
class Areas {
  public Id: number = 0;
  public AreaCode: string = '';
  public AreaName: string = '';
  public ParentId: number | undefined;
  constructor(init?: Partial<Areas>) {
    Object.assign(this, init);
  }
}
