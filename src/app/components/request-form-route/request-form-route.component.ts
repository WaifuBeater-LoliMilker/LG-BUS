import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { ColumnDefinition, Tabulator } from 'tabulator-tables';
import { TabulatorTableSingleComponent } from '../_shared/tabulator-table/tabulator-tables.component';

@Component({
  selector: 'app-request-form-route',
  templateUrl: './request-form-route.component.html',
  styleUrls: ['./request-form-route.component.css'],
  imports: [NgbDatepickerModule, FormsModule, TabulatorTableSingleComponent],
})
export class RequestFormRouteComponent implements OnInit {
  @ViewChild('table', { static: true }) tableEl!: ElementRef;
  @ViewChild('dateInputTemplate', { static: true })
  dateInputTemplate!: TemplateRef<any>;
  @ViewChild('vcHost', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;
  @Input() dynamicTabs!: any;

  table!: Tabulator;
  columns: ColumnDefinition[] = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    {
      title: 'Date',
      field: 'date',
      formatter: (cell) => {
        const container = document.createElement('div');
        const rowData = cell.getRow().getData();
        const view = this.vcr.createEmbeddedView(this.dateInputTemplate, {
          row: rowData,
        });
        view.rootNodes.forEach((node) => container.appendChild(node));
        return container;
      },
    },
  ];
  data = [
    { id: 1, name: 'Machine 1', date: { year: 2025, month: 9, day: 17 } },
    { id: 2, name: 'Machine 2', date: { year: 2025, month: 9, day: 18 } },
  ];

  ngOnInit() {}
  openDatepicker(d: NgbInputDatepicker) {
    try {
      d.open();
    } catch (err) {
      console.log(err);
    }
  }
}
interface RowData {
  id: number;
  name: string;
  pickupDate: NgbDateStruct;
  pickupTime: string;
}
