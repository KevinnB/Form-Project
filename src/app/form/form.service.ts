import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../shared/auth.service';

import { Form } from './form.model';
import { cleansedModel } from '../shared/cleansed.model';


@Injectable()
export class FormService {
  cleanup: cleansedModel = new cleansedModel();
  forms: FirebaseListObservable<Array<Form>>;

  constructor(private af: AngularFire,
              private auth: AuthService) {
  }

  getForms(): FirebaseListObservable<Array<Form>> {
    var self = this;
    return this.auth.getCurrentUser()
      .switchMap((user) =>  this.af.database.list('/UserForms/' + user.uid)
        .map((list) => {
          return list.map((item) => {
              return item.$key;
          });
        }))
        .switchMap((list) => {
          // Use forkJoin to join the form observables. The observables will
          // need to complete, so first is used. And use forkJoin's selector to
          // map the forms to their data and then return the final object.

          return Observable.forkJoin(
            list
            .map((key) => this.af.database
              .object(`/Forms/${key}`)
              .first()
              .map((dbForm) => {
                return self.hydrateForm(dbForm);
              })
            )

          );
        }) as FirebaseListObservable<Array<Form>>; 
  }

  getForm(key:string): FirebaseListObservable<Form> {
    var self = this;
    return this.af.database.object('/Forms/' + key)
      .map((item) => {
        return self.hydrateForm(item);
      }) as FirebaseListObservable<Form>;
  }

  addForm(data: Form): string {
    var model = this.cleanup.cleanse(data);
    console.log("Add", model);
    return this.af.database.list('/Forms').push(model).key;
  }

  removeForm(key: string) {
    return this.af.database.object('/Forms/' + key).remove();
  }

  hydrateForm(data:any): Form {
    // This translates a firebase object into a typescript object
    return new Form(data.name, data.created, data.creator, data.creatorName, data.updated, data.dueDate, data.$key, data.status);
  }
}
