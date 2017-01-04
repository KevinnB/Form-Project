import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import * as firebase from 'firebase';

import { Subscription } from 'rxjs/Subscription';
import { Observable, Subscribable } from 'rxjs/Observable';

import { AuthUser } from './authUser.model';

import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, FirebaseAuthState, AuthProviders } from 'angularfire2';

@Injectable()
export class AuthService{
  public user: AuthUser;
  public loading: boolean;
  public message: string;

  constructor(private af: AngularFire, 
              private router: Router) { 
                this.user = null;
                this.loading = false;
                this.message = "";
              }

  getProviderHR(providerId: string) {
    for ( var key in AuthProviders ) {
      if( AuthProviders[key] === providerId ) {
          return key;
        }
    };
  }

  getAuthProvider(providerId: string) {
    switch(providerId) {
      case "Github": 
      case "github.com":
        return {
          fb_provider:  new firebase.auth.GithubAuthProvider(),
          af_provider: AuthProviders.Github
        };
      case "Twitter": 
      case "twitter.com":
        return {
          fb_provider:  new firebase.auth.TwitterAuthProvider(),
          af_provider: AuthProviders.Twitter
        };
      case "Facebook": 
      case "facebook.com":
        return {
          fb_provider:  new firebase.auth.FacebookAuthProvider(),
          af_provider: AuthProviders.Facebook
        };
      case "Google": 
      case"google.com":
        return {
          fb_provider:  new firebase.auth.GoogleAuthProvider(),
          af_provider: AuthProviders.Google
        };
      default:
        return null;
    }
  }

  getUser() : Observable<any> {
    let combined = this.af.auth
          // Filter out unauthenticated states
        .filter(Boolean)
          // Switch to an observable that emits the user.
        .switchMap((auth) => this.af.database.object('Users/' + auth.uid)
          .do((user) => { 
            if(!user.$exists()) {
              return this.createNewDbUser(auth);
            }
          })
          .map((user) => {
            this.user = new AuthUser(auth.auth, user, this.getAuthProvider);
            return this.user;
          }));
          
          // Switch to an observable that emits the conversation and combine it
          // with the user.
          //.switchMap((user) => this.af.database
          //    .list('/conversations/' + user.conversationid)
          //    .map((conversation) => ({ user, conversation }))
          //);
          // The resultant observable will emit objects that have user and
          // conversation properties.
        return combined;
  }

  createNewDbUser (user: any) {
    return this.af.database.list('Users').$ref.ref.child(user.uid).set({
      photoUrl: user.auth.photoURL || 'http://thecatapi.com/api/images/get?format=src&type=gif',
      joined: Date.now(),
      updated: Date.now(),
      roles: {
        user: true
      }
    });
  }

  login (providerId: string, userName?: string, password?: string) {
    var providerKey = this.getProviderHR(providerId);
    var self = this;

    return this.af.auth.login({
      provider: AuthProviders[providerKey],
      method: AuthMethods.Popup
    }).then(function(success) {
        self.getUser();
        return success;
    }, function (failure) {
        return failure;
    });
  }

  logout() {
    this.user = null;
    this.af.auth.logout();
  }
}