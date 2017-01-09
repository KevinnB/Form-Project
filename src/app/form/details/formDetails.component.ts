import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { Form } from '../form.model';
import { FormService } from '../form.service';
import { Status } from '../../shared/status.model';
import { KeyValue } from '../../shared/keyValue.model';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-forms-details',
  templateUrl: './formDetails.component.html',
  styleUrls: ['./formDetails.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormDetailsComponent {
  _subscription: Subscription;
  statusList: Array<KeyValue>;
  formId: string;
  form: Form;

  getkeys(list) : Array<KeyValue> {
      var keys = Object.keys(list);
      keys = keys.slice(keys.length / 2);
      
      return keys.map((item) => {
        return new KeyValue(item, Status[item]);
      });
  }

  updateStatusHr (key) {
    this.form._statusHR = Status[key];
  }

  onSubmit(event, valid) {
    event.preventDefault();
    if(valid) {
      console.log("Submit");
      this.fs.updateForm(this.form)
        .then((response) => {
          console.log("Success", response);
        }, (response) => {
          console.error("Error", response);
        });
    }
  }

  ngOnInit() {
    this.statusList = this.getkeys(Status);
    console.log(this.statusList);

    this.route.params.forEach((params: Params) => {
      this.formId = params['id'];
    });

    this._subscription = this.fs.getForm(this.formId).subscribe(data => {
      if(data) {
        this.form = data;
      } else {
        this.router.navigate(['PageNotFound']);
      }
    });
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  constructor(private fs: FormService, 
              private router: Router,
              private route: ActivatedRoute) { }
}
