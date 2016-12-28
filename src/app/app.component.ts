import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from './shared/auth.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  user: any;
  userName: String;
  photoURL: String;

constructor (private af: AngularFire, 
             private router: Router,
             private auth: AuthGuard) {
            
        this.user = auth.user;
        console.log("App")
          af.auth.subscribe((auth) => {
            console.log(auth);
            if(!auth) {
              this.router.navigate(['/login']);
            } else {
              this.user = auth.auth;
            }
          });
  }

  logout() {
    this.af.auth.logout();
  }
}
