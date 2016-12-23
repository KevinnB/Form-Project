import { Component, OnInit } from '@angular/core';

import { Form } from '../form/form.model';
import { FormService } from '../form/form.service';

import { cleansedModel } from '../shared/cleansed.model';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormComponent implements OnInit {
  cleanup: cleansedModel = new cleansedModel();
  items: FirebaseListObservable<Array<Form>>;

  ngOnInit(){

  }

  constructor(af: AngularFire, 
              private fs: FormService) {
    this.items = fs.getForms();
  }

  selectItem (item: Form) {
    item.selected = !item.selected
  } 
}
