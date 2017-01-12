import { EntityService } from '../../entity/entity.service';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Form } from '../form.model';
import { FormService } from '../form.service';
import { Status } from '../../shared/status.model';
import { PageSettings } from '../../shared/pageSettings.model';
import { KeyValue } from '../../shared/keyValue.model';

import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-forms-details',
  templateUrl: './formDetails.component.html',
  styleUrls: ['./formDetails.component.scss'],
  providers: [
    FormService,
    EntityService
  ]
})
export class PageFormDetailsComponent {
  _pageSettings: PageSettings;
  _subscription: Subscription;
  entities: Array<any>;
  statusList: Array<KeyValue>;
  formId: string;
  form$: FirebaseObjectObservable<Form>;
  form: Form;

  getkeys(list) : Array<KeyValue> {
      var keys = Object.keys(list);
      keys = keys.slice(keys.length / 2);
      
      return keys.map((item) => {
        return new KeyValue(item, Status[item]);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 3000,
    });
  }

  onSubmit(event, valid) {
    var self = this;
    event.preventDefault();
    if(valid) {

      this.fs.updateForm(this.form)
        .then((response) => {
          self.openSnackBar("Successfully saved form.");
        }, (response) => {
          self.openSnackBar("Failed to save form. Please try again.");
        });
    }
  }

  ngOnInit() {
    this.statusList = this.getkeys(Status);
    
    this.route.params.forEach((params: Params) => {
      this.formId = params['id'];
    });

    this.form$ = this.fs.getForm(this.formId);

    this._subscription = this.form$
      .switchMap((form) => {
        return this.es.getEntities(form.$key)
          .map(entities => {
            form._entities = entities;
            return form;
          })
      })
      .subscribe(data => {
        if(data) {
          this.form = data;
          this.entities = this.form._entities;
          this._pageSettings.stopLoading();
          this.ngOnDestroy();
        } else {
          this._pageSettings.error("Cannot find Data.");
          this.router.navigate(['PageNotFound']);
        }
    });
  }

  transferDataSuccess ($event) {
    this.entities.push($event.dragData);
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  constructor(private fs: FormService, 
              private es: EntityService, 
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MdSnackBar) { 

                this._pageSettings = new PageSettings(true);
              }
}
