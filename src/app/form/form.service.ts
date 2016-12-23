import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { Form } from './form.model';
import { cleansedModel } from '../shared/cleansed.model';


@Injectable()
export class FormService {
  cleanup: cleansedModel = new cleansedModel();

  constructor(private af: AngularFire) { }

  getForms(): FirebaseListObservable<Array<Form>>{ 
    return this.af.database
      .list('/Forms')
      .map((items) => {
        return items.map( item => {
          return new Form(item.name, item.created, item.creator, item.dueDate, item.$key, item.status);
        })
      }) as FirebaseListObservable<Array<Form>>;
  }

  getForm(key:String): FirebaseListObservable<Form> {
    return this.af.database.object('/Forms/' + key)
      .map((item) => {
          return new Form(item.name, item.created, item.creator, item.dueDate, item.$key, item.status);
      }) as FirebaseListObservable<Form>;
  }
  addForm(data: Form): String {
    var model = this.cleanup.cleanse(data);
    console.log(model);
    return this.af.database.list('/Forms').push(model).key;
  }
}
