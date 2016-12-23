import { Component, OnInit } from '@angular/core';

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

constructor (af: AngularFire) {
  af.auth.subscribe((auth) => {
    this.user = auth;
    this.userName = this.user.displayName || "Anonymous";
    console.log(this.user);
  });
}
}
