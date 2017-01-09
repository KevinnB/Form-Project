import { AuthProviders } from 'angularfire2/auth';
import { AuthUser } from '../shared/auth/authUser.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../shared/auth/auth.service';

import { ApplicationSettings } from '../shared/appSettings.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: Observable<AuthUser>;
  allowedAuthProviders: Array<AuthProviders>;


  constructor(private auth: AuthService,
              private settings: ApplicationSettings) {
    this.user = auth.getCurrentUser();
    this.allowedAuthProviders = this.settings.AllowedAuthProviders;
  }

  linkAccount(provider: string) {
    this.auth.linkAccount(provider);
  }
}
