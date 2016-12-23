import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class PageLoginComponent {

constructor (private af: AngularFire, private router: Router) {
  af.auth.map((auth) =>  {
      console.log(auth);
      if(auth !== null) {
        this.router.navigate(['/home']);
        return false;
      }
    }).first();
}

  login() {
    var self = this;
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    }).then(function(success) {
        console.log(success);
        self.router.navigate(['/home']);
    });
  }
}
