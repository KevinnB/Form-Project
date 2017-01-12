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

  hydrateEntity(data: any, currentUser: AuthUser): Entity {
    // This translates a firebase object into a typescript object
    var entity = new Entity(data.created, data.creator, data.creatorName, data.updated, data.height, data.labelName, data.propName, data.type, data.toolId, data.cols, data.order, data.value, data.$key);

    entity._permission.addRole(PermissionEntry.CanAccess);

    if (currentUser.uid === entity.creator) {
      entity._permission.addRole(PermissionEntry.CanDelete);
      entity._permission.addRole(PermissionEntry.CanEdit);
    }

    return entity;
  }

}
