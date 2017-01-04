import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  __userSubscription: Subscription;
  user: any;


  constructor(private auth: AuthService) { 
    this.user = auth.user;
  }

  ngOnInit() {
    if(!this.user) {
      this.__userSubscription = this.auth.getUser()
        .subscribe((user) => { this.user = user});
    }
  }
}
