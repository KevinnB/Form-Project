import { MdDialog } from '@angular/material';
import { EntityService } from '../entity/entity.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
  inputs: [
    'toolId',
    'formId',
    'toolIndex',
    'allowDrag',
    'displayOnly',
    'model'
  ]
})
export class ToolComponent implements OnInit {
  toolId: number;
  formId: string;
  allowDrag: boolean;
  displayOnly: boolean;
  toolIndex: number;
  model: Object;

  constructor(private es: EntityService,
              public dialog: MdDialog) { 
  }

  ngOnInit() {
    console.log(this);
  }

  deleteTool(key: string) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent);
    let sub = dialogRef.afterClosed().subscribe(result => {
      if(result) {
          this.es.deleteEntity(this.formId, key).first();
      }
      sub.unsubscribe();
    });
  } 
}
