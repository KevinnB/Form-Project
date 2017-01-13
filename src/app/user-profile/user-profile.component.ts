import { KeyValue } from '../shared/keyValue.model';
import { AuthProviders } from 'angularfire2/auth';
import { AuthUser } from '../shared/auth/authUser.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../shared/auth/auth.service';
import { PageSettings } from '../shared/pageSettings.model';

import { ApplicationSettings } from '../shared/appSettings.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  _pageSettings: PageSettings;
  user: Observable<AuthUser>;
  roles: Array<string>
  allowedAuthProviders: Array<AuthProviders>;


  constructor(private auth: AuthService,
              private settings: ApplicationSettings) {

    this._pageSettings = new PageSettings(true);     
    this.allowedAuthProviders = this.settings.AllowedAuthProviders;       
    this.user = auth.getCurrentUser();
    this.roles = [];

    this.user.subscribe((val) => {
      if(!val) {
        return [];
      }
      for (var key in val.roles) {
        this.roles.push(key);
      }
      this._pageSettings.stopLoading();
    });
  }

  linkAccount(provider: string) {
    this.auth.linkAccount(provider);
  }
}
