import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationSettings } from '../shared/appSettings.model';
import { AuthGuard } from '../shared/auth.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class PageLoginComponent {
  allowedAuthProviders: Array<AuthProviders>;

  constructor (private af: AngularFire, 
               private router: Router,
               private settings: ApplicationSettings,
               private auth: AuthGuard) {

  this.allowedAuthProviders = settings.AllowedAuthProviders;

  af.auth.map((auth) =>  {
      console.log(auth);
      if(auth !== null) {
        this.router.navigate(['/home']);
        return false;
      }
    }).first();
}

  getProviderHR(providerId: String){
    for ( var key in AuthProviders ) {
      if( AuthProviders[key] === providerId ) {
          return key;
        }
    };
  }

  login(providerId: String) {
    var self = this;
    var providerKey = 'Google';

    providerKey = this.getProviderHR(providerId);

    this.af.auth.login({
      provider: AuthProviders[providerKey],
      method: AuthMethods.Popup
    }).then(function(success) {
        self.router.navigate(['/home']);
    });
  }
}
