import { EntityService } from '../../entity/entity.service';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Form } from '../form.model';
import { PageSettings } from '../../shared/pageSettings.model';
import { FormService } from '../form.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-forms',
  templateUrl: './formList.component.html',
  styleUrls: ['./formList.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormListComponent implements OnInit {
  _pageSettings: PageSettings;
  _subscription: Subscription;
  forms: FirebaseListObservable<Array<Form>>;

  constructor(private fs: FormService) {
    this._pageSettings = new PageSettings(true);
  }

  selectItem (item: Form) {
    item._selected = !item._selected
  } 

  ngOnInit(){
    this.forms = this.fs.getForms();

    this._subscription = this.forms.subscribe(data => {
      if(data) {
        this._pageSettings.stopLoading();
        this.ngOnDestroy();
      } else {
        this._pageSettings.error("Cannot find Data.");
      }
    });
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  addForm(content) {
    //this.ms.open(content).result.then((result) => {
    //  console.log(`Closed with: ${result}`);
    //}, (reason) => {
    //  console.log(`Dismissed ${reason}`);
    //});
  }
}
