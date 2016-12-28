import { Component, OnInit } from '@angular/core';

import { AuthGuard } from '../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private auth: AuthGuard) { 
    this.user = auth.user;
  }

  ngOnInit() {
  }

}
