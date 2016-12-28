import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate{
  public user: Object;

  constructor(private af: AngularFire, 
              private router: Router) { 
                this.user = null;
              }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable<boolean> {

    return this.af.auth.map((auth) =>  {
      this.user = auth;
      if(auth == null) {
        this.router.navigate(['/not-authorized']);
        return false;
      } else {
        return true;
      }
    }).first()
  }
}