import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { Form } from '../form.model';
import { FormService } from '../form.service';

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
  formId: string;
  form: Form;

  ngOnInit() {
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
