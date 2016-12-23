import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { Form } from './form/form.model';
import { FormService } from './form/form.service';

import { cleansedModel } from './shared/cleansed.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FormService
  ]
})
export class AppComponent {
  myFormItem: FormGroup;
  cleanup: cleansedModel = new cleansedModel();
  items: FirebaseListObservable<Array<Form>>;

  constructor(af: AngularFire, 
              private fs: FormService, 
              fb: FormBuilder) {

    af.auth.login({ method: AuthMethods.Anonymous, provider: AuthProviders.Anonymous});

    this.items = fs.getForms(af);
  }

  selectItem (item: Form) {
    item.selected = !item.selected
  } 
}
