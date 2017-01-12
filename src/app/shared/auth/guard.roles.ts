import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';


@Injectable()
export class AuthGuardRoles implements CanActivate {
  roles: Array<string>;

  constructor(private af: AngularFire,
    private auth: AuthService,
    private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    var roles = route.data["roles"];
    return this.auth.getCurrentUser().map((auth) =>  {
      try {
        if(auth == null) {
          this.redirect(state.url);
          return false;
        } else {
          var hasRoles = false;

          for(var i = 0; i < roles.length; i++) {
            if (auth.roles[roles[i].toLowerCase()]) {
              hasRoles = true;
            } else {
              hasRoles = false;
            }
          }

          if(!hasRoles) {
            this.redirect(state.url);
          }
          
          return hasRoles;
        }
      } catch (e) {
        this.redirect(state.url);
        return false;
      }
      
    }).first();
  }


  redirect(returlUrl: string) {
    this.router.navigate(['/not-authorized'], { queryParams: { returnUrl: returlUrl }});
  }
}
