import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApplicationSettings } from '../shared/appSettings.model';
import { AuthService } from '../shared/auth/auth.service';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class PageLoginComponent implements OnInit {
  allowedAuthProviders: Array<AuthProviders>;
  returnUrl: string;

  constructor (private af: AngularFire, 
               private router: Router,
               private route: ActivatedRoute,
               private settings: ApplicationSettings,
               private auth: AuthService) { }

    ngOnInit() {
      this.auth.logout();
      this.allowedAuthProviders = this.settings.AllowedAuthProviders;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(providerId: string) {
      var self = this;

      this.auth.login(providerId)
      .then(function(success) {
        self.router.navigate([self.returnUrl]);
      }, function (error) {
        console.error("Error logging in: ", error);
      })
    }
}
