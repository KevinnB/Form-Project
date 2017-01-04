import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { Injectable, Inject  } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Injectable()
export class AuthGuardLoggedIn implements CanActivate{

  constructor(private af: AngularFire, 
              private auth: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean> {

  let notificationArrayStream = this.auth.getUser()
    .map((auth) =>{
        if(!auth) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        } else {
          return true;
        }
    });

    return notificationArrayStream;
  }
}