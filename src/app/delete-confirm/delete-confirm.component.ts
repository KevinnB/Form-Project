import { MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DeleteConfirmComponent>) { }

  ngOnInit() {
  }

}
