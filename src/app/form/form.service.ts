import { PermissionEntry, test } from '../shared/auth/permissionEntry.model';
import { AuthUser } from '../shared/auth/authUser.model';
import { AuthService } from '../shared/auth/auth.service';

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

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
            var keys = list.map((item) => {
                return item.$key;
            });

            return {user: user, keys: keys};
        }))
        .switchMap((data) => {
          // Use forkJoin to join the form observables. The observables will
          // need to complete, so first is used. And use forkJoin's selector to
          // map the forms to their data and then return the final object.

          return Observable.forkJoin(
            data.keys
            .map((key) => this.af.database
              .object(`/Forms/${key}`)
              .first()
              .map((dbForm) => {
                return self.hydrateForm(dbForm, data.user);
              })
            )

          );
        }) as FirebaseListObservable<Array<Form>>; 
  }

  getForm(key:string): FirebaseListObservable<Form> {
    var self = this;

    return this.auth.getCurrentUser()
      .switchMap((user) =>  this.af.database.object('/UserForms/' + user.uid + '/' + key)
          .map((object) => {
            var exists = (object && object.$exists())
            return {user: user, canAccess: exists};
        }))
        .switchMap((data) => {
          if(data.canAccess) {
            return this.af.database
              .object('/Forms/' + key)
              .map((dbForm) => {
                return self.hydrateForm(dbForm, data.user);
              });
          } else {
            return Observable.of(null);
          }
        }) as FirebaseListObservable<Form>; 

    //return this.af.database.object('/Forms/' + key)
    //  .map((item) => {
    //    return self.hydrateForm(item, auth);
    //  }) as FirebaseListObservable<Form>;
  }

  addForm(data: Form): string {
    var model = this.cleanup.cleanse(data);
    console.log("Add", model);
    return this.af.database.list('/Forms').push(model).key;
  }

  removeForm(key: string) {
    return this.af.database.object('/Forms/' + key).remove();
  }



  hydrateForm(data:any, currentUser: AuthUser): Form {
    // This translates a firebase object into a typescript object
    var form = new Form(data.name, data.created, data.creator, data.creatorName, data.updated, data.dueDate, data.$key, data.status);
    
    form._permission.addRole(PermissionEntry.CanAccess);
    
    if(currentUser.uid === form.creator) {
      form._permission.addRole(PermissionEntry.CanDelete);
      form._permission.addRole(PermissionEntry.CanEdit);
    }

    return form;
}
}
