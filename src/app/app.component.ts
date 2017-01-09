import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './shared/auth/auth.service';
import { AuthUser } from './shared/auth/authUser.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
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
}
