import { Tools } from '../shared/tools.model';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { PermissionEntry } from '../shared/auth/permissionEntry.model';
import { AuthUser } from '../shared/auth/authUser.model';
import { AuthService } from '../shared/auth/auth.service';

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { cleansedModel } from '../shared/cleansed.model';
import { Entity } from './entity.model';



@Injectable()
export class EntityService {
  cleanup: cleansedModel = new cleansedModel();

  constructor(private af: AngularFire,
    private auth: AuthService) {
  }

  // we can only get entities when we know what form they are associated with
  getEntities(key: string): FirebaseListObservable<Array<Entity>> {
    var self = this;


    return this.auth.getCurrentUser()
      .switchMap((user) => this.af.database.list('/Entities/' + key)
        .map((list) => {
          return list.map((item) => {
            return self.hydrateEntity(item, user);
          });
        }))
      .switchMap((data) => {
        // Use forkJoin to join the form observables. The observables will
        // need to complete, so first is used. And use forkJoin's selector to
        // map the forms to their data and then return the final object.
        if (!data || data.length === 0) {
          return Observable.of([]);
        }

        return Observable.forkJoin(
          data
            .map((entity) => this.af.database
              .object(`/EntityValidation/${entity.$key}`)
              .first()
              .map((validation) => {
                if (validation && validation.$exists()) {
                  entity._validation = validation;
                }
                return entity;
              })
            )
        );
      }) as FirebaseListObservable<Array<Entity>>;
  }

  addEntity(formId: string, data: Entity): Promise<Entity> {
    return this.auth.getCurrentUser()
      .map((auth) => {
        var model;
        // Continue setting defaults now that we have the auth.
        data.creator = auth.uid;
        data.creatorName = auth.displayName;

        model = this.cleanup.cleanse(data);
        console.log("Add", model);
        data.$key = this.af.database.list('/Entities/' + formId).push(model).key;
        return data;
      }).toPromise();
  }

  deleteEntity(formId: string, key:string) {
    return Observable.forkJoin(
      this.af.database.object(`Entities/${formId}/${key}`).remove(),
      this.af.database.object(`EntityValidation/${key}`).remove()
    );
  }

  updateEntities(formId: string, data: Array<Entity>) {
    var promises = Array<Promise<any>>();

    for (var i = 0; i < data.length; i++) {
      data[i].updated = Date.now();

      var model = this.cleanup.cleanse(data[i]);
      console.log("Update", model);
      promises.push(this.af.database.object('/Entities/' + formId + '/' + data[i].$key).update(model) as Promise<any>);
    }

    return Observable.zip(promises,
      function (firstResolvedValue, secondResolvedValue) {
        console.log(arguments);
        return firstResolvedValue && secondResolvedValue;
      }
    )

  }

  hydrateEntity(data: any, currentUser: AuthUser): Entity {
    // This translates a firebase object into a typescript object
    var entity = new Entity(data.created, data.creator, data.creatorName, data.updated, data.height, data.labelName, data.propName, data.type, data.toolId, data.cols, data.order, data.value, data.options, data.$key);

    entity._permission.addRole(PermissionEntry.CanAccess);

    if (currentUser.uid === entity.creator) {
      entity._permission.addRole(PermissionEntry.CanDelete);
      entity._permission.addRole(PermissionEntry.CanEdit);
    }

    return entity;
  }

  getBlankEntity(toolId: Tools): Entity {
    var entity = new Entity(Date.now(), "", "", Date.now(), "auto", "", "", "", 0, 1, 0);

    if (toolId === Tools.Select) {
      var options = [];
      options.push({ text: '- Select an Option -', value: -1 });
      entity.options = options;
      entity.value = -1;
    }

    return entity;
  }

}
