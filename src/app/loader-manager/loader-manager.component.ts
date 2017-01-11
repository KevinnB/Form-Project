import { PageSettings } from '../shared/pageSettings.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-manager',
  templateUrl: './loader-manager.component.html',
  styleUrls: ['./loader-manager.component.scss'],
  inputs: [
    'config'
  ]
})
export class LoaderManagerComponent implements OnInit {
  public config: PageSettings;


  constructor() { 
  }

  ngOnInit() {
  }

}
