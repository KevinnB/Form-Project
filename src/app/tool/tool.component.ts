import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
  inputs: [
    'toolId',
    'toolIndex',
    'allowDrag',
    'displayOnly',
    'model'
  ]
})
export class ToolComponent implements OnInit {
  toolId: number;
  allowDrag: boolean;
  displayOnly: boolean;
  toolIndex: number;
  model: Object;

  constructor() { 
  }

  ngOnInit() {
    console.log(this);
  }

}
