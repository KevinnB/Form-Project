import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { Form } from './form.model';
import { cleansedModel } from '../shared/cleansed.model';


@Injectable()
export class FormService {
  cleanup: cleansedModel = new cleansedModel();
  forms: FirebaseListObservable<Array<Form>>;

  constructor(private af: AngularFire) { 
    this.forms = this.getForms();
  }

  getForms(): FirebaseListObservable<Array<Form>>{ 
    var self = this;
    return this.af.database
      .list('/Forms')
      .map((items) => {
        return items.map( item => {
          return self.hydrateForm(item);
        })
      }) as FirebaseListObservable<Array<Form>>;
  }

  getForm(key:String): FirebaseListObservable<Form> {
    var self = this;
    return this.af.database.object('/Forms/' + key)
      .map((item) => {
        return self.hydrateForm(item);
      }) as FirebaseListObservable<Form>;
  }

  addForm(data: Form): String {
    var model = this.cleanup.cleanse(data);
    console.log("Add", model);
    return this.af.database.list('/Forms').push(model).key;
  }

  removeForm(key: String) {
    return this.af.database.object('/Forms/' + key).remove();
  }

  hydrateForm(data:any): Form {
    // This translates a firebase object into a typescript object
    return new Form(data.name, data.created, data.creator, data.updated, data.dueDate, data.$key, data.status);
  }
}
