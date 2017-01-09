import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { Form } from '../form.model';
import { FormService } from '../form.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-forms',
  templateUrl: './formList.component.html',
  styleUrls: ['./formList.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormListComponent {
  forms: FirebaseListObservable<Array<Form>>;

  constructor(private fs: FormService) {
    this.forms = fs.getForms();

    this.forms.subscribe(console.log);
  }

  selectItem (item: Form) {
    item._selected = !item._selected
  } 

  addForm(content) {
    //this.ms.open(content).result.then((result) => {
    //  console.log(`Closed with: ${result}`);
    //}, (reason) => {
    //  console.log(`Dismissed ${reason}`);
    //});
  }
}
