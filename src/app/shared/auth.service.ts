import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { Injectable, Inject  } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, FirebaseAuthState, AuthProviders } from 'angularfire2';

@Injectable()
export class AuthService{
  public user: firebase.User;
  public dbUser: any;

  constructor(private af: AngularFire, 
              private router: Router) { 
                this.user = null;
              }

  getProviderHR(providerId: string){
    for ( var key in AuthProviders ) {
      if( AuthProviders[key] === providerId ) {
          return key;
        }
    };
  }

  getUserRoles(uid: string) {
    return this.af.database.object('Users/' + uid).subscribe(user => {
      if(user.$exists()) {
        this.dbUser = user;
        return this.dbUser;
      } else {
        return this.createNewDbUser(uid);
      }
    })
  }

  createNewDbUser (uid: string) {
    return this.af.database.list('Users').$ref.ref.child(uid).set({
      joined: Date.now(),
      updated: Date.now(),
      roles: {
        user: true
      }
    });
  }

  login (providerId: string, userName?: string, password?: string) {
    var providerKey = this.getProviderHR(providerId);
    var self = this;

    return this.af.auth.login({
      provider: AuthProviders[providerKey],
      method: AuthMethods.Popup
    }).then(function(success) {
        self.getUserRoles(success.uid);
        return success;
    }, function (failure) {
        return failure;
    });
  }

  logout() {
    this.user = null;
    this.af.auth.logout();
  }
}