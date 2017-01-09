import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { Form } from '../form.model';
import { FormService } from '../form.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-forms-details',
  templateUrl: './formDetails.component.html',
  styleUrls: ['./formDetails.component.scss'],
  providers: [
    FormService
  ]
})
export class PageFormDetailsComponent {
  formId: string;
  form: FirebaseListObservable<Form>;

    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        this.formId = params['id'];
      });

      this.form = this.fs.getForm(this.formId);
      console.log(this.formId); // you should get your parameters here
    }

  constructor(private fs: FormService, 
              private router: Router,
              private route: ActivatedRoute) {
    //this.forms = fs.getForms();
  }
}
