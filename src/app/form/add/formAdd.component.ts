import { Component, OnInit } from '@angular/core';

import { Form } from '../form.model';
import { FormService } from '../form.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-form-add',
  templateUrl: './formAdd.component.html',
  styleUrls: ['./formAdd.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormAddComponent implements OnInit {
  item: Form;

  ngOnInit(){ }
  constructor(private fs: FormService) { }

  addItem (item: Form) {
    this.fs.addForm(this.item);
  } 
}
