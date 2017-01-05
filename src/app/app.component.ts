import { AuthUser } from './shared/authUser.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './shared/auth.service';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  __userSubscription: Subscription;
  user: Observable<AuthUser>;

  constructor (private af: AngularFire, 
             private router: Router,
             private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }
  
  ngOnDestroy() {
      this.__userSubscription.unsubscribe();
   }
}
