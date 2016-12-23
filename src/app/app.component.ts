import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { Form } from './form/form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myFormItem: FormGroup;
  items: Observable<any[]>;
  loading: Boolean = true;

  constructor(af: AngularFire, fb: FormBuilder) {
    af.auth.login({ method: AuthMethods.Anonymous, provider: AuthProviders.Anonymous});

    this.loading = true;
    this.items = af.database.list('/Forms');
  }

  submitForm(model: Form, isValid: boolean) {
        console.log(model, isValid);
    }
}
