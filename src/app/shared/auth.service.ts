import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { DOCUMENT } from '@angular/platform-browser'
import { Injectable, Inject  } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Injectable()
export class AuthService{
  public user: Object;

  constructor(private af: AngularFire, 
              private router: Router) { 
                this.user = null;
              }

  getProviderHR(providerId: String){
    for ( var key in AuthProviders ) {
      if( AuthProviders[key] === providerId ) {
          return key;
        }
    };
  }

  login (providerId: String, userName?: String, password?: String) {
    var providerKey = this.getProviderHR(providerId);

    return this.af.auth.login({
      provider: AuthProviders[providerKey],
      method: AuthMethods.Popup
    }).then(function(success) {
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