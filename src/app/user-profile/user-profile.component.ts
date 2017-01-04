import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../shared/auth.service';

import { ApplicationSettings } from '../shared/appSettings.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  __userSubscription: Subscription;
  user: any;
  allowedAuthProviders: any;


  constructor(private auth: AuthService,
              private settings: ApplicationSettings) {
    this.user = auth.user;
    this.allowedAuthProviders = this.settings.AllowedAuthProviders;
  }

  linkAccount(provider: Number) {
    this.auth.linkAccount(provider);
  }

  ngOnInit() {
    if(!this.user) {
      this.__userSubscription = this.auth.getUser()
        .subscribe((user) => { this.user = user});
    }
  }
}
