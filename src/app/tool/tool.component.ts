import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
  inputs: [
    'toolType',
    'allowDrag',
    'displayOnly'
  ]
})
export class ToolComponent implements OnInit {
  toolType: string;
  allowDrag: boolean;
  displayOnly: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.toolType, this.allowDrag, this.displayOnly);
  }

}
