import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {PrincipleService} from '../../../service/principle.service';

@Component({
  selector: 'app-po-actions-cell',
  templateUrl: './tracking-test-actions-cell.component.html',
  styleUrls: ['./tracking-test-actions-cell.component.scss']
})
export class TrackingTestActionsCellComponent implements ICellRendererAngularComp {
  public params: any;
  currentUser;

  agInit(params: any): void {
    this.params = params;
  }

  isAllowEdit() {
    return this.principleService.isRM();
  }

  constructor(private  principleService: PrincipleService) {
  }

  onEdit() {
    this.params.context.componentParent.onEdit(this.params.node.rowIndex);
  }

  onDelete() {
    this.params.context.componentParent.onDelete(this.params.node.rowIndex);
  }

  refresh(): boolean {
    return false;
  }
}
