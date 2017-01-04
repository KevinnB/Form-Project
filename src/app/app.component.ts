import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './shared/auth.service';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  __userSubscription: Subscription;
  userName: string;
  photoURL: string;

  constructor (private af: AngularFire, 
             private router: Router,
             private auth: AuthService) { }

  logout() {
    this.__userSubscription.unsubscribe();
    this.auth.logout();
  }

  ngOnInit() {
    this.__userSubscription = this.auth.getUser()
      .subscribe((auth) => {
        if(!auth) {
          this.router.navigate(['/login']);
        }
    });
  }
  ngOnDestroy() {
      this.__userSubscription.unsubscribe();
   } 
}
