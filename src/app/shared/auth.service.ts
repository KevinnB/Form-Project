import { FirebaseAuth } from 'angularfire2/auth';
import { BehaviorSubject, Subscriber } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import * as firebase from 'firebase';

import { Subscription } from 'rxjs/Subscription';
import { Observable, Subscribable } from 'rxjs/Observable';

import { AuthUser } from './authUser.model';

import { Injectable, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire, AuthMethods, FirebaseAuthState, AuthProviders } from 'angularfire2';

@Injectable()
export class AuthService implements OnInit {
  private _userSubscription: Subscription;
  private _user: BehaviorSubject<AuthUser> = new BehaviorSubject(null);;

  public loading: boolean;
  public message: string;

  ngOnInit() {
      this._user.next(null);
      this.loading = false;
      this.message = "";
  }

  constructor(private af: AngularFire, 
              private route: Router) { 
                this.loadUser();
              }


  getCurrentUser () :Observable<AuthUser> {
    return this._user.asObservable()
    .filter((user) => { return !!user; });
  }

  loadUser () {
    this._userSubscription = this.userObservableConverter().subscribe(
      res => {
          console.log(res);
          this._user.next(res);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Completed");
    });
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

  userObservableConverter() : Observable<any> {
    let combined = this.af.auth
          // Filter out unauthenticated states
        .filter((auth) => {
            console.log("auth", !!auth);
            return !!auth;
        })
          // Switch to an observable that emits the user.
        .switchMap((auth) => this.af.database.object('Users/' + auth.uid)
          .do((user) => { 
            if(!user.$exists()) {
              return this.createNewDbUser(auth);
            }
          })
          .map((user) => {
            return new AuthUser(auth.auth, user, this.getAuthProvider);
          }));
          
        return combined;
  }

  createNewDbUser (user: FirebaseAuthState) {
    return this.af.database.list('Users').$ref.ref.child(user.uid).set({
      photoUrl: user.auth.photoURL || 'http://thecatapi.com/api/images/get?format=src&type=gif',
      joined: Date.now(),
      updated: Date.now(),
      roles: {
        user: true
      }
    });
  }

  linkAccount(providerId: string) {
    let at = AuthProviders;
    let providerHR = AuthProviders[providerId];
    let FB_provider = this.getAuthProvider(providerHR);

    console.log(this.af.auth, providerId, at[providerId]);

    firebase.auth().currentUser.linkWithPopup(FB_provider.fb_provider)
    .then(function(result) {
      if (result.credential) {
        console.log("Success", result);
      }
    }).catch(function(error) {
      console.log("Failed", error);
    });
  }

  unlinkAccount(providerId: string) {
    firebase.auth().currentUser.unlink(providerId).then(function(result) {
      console.log("Success", result);
    }, function(error) {
      console.log("Failed", error);
    });
  }

  login (providerId: string, userName?: string, password?: string) {
    var providerKey = this.getProviderHR(providerId);
    var self = this;

    return this.af.auth.login({
      provider: AuthProviders[providerKey],
      method: AuthMethods.Popup
    }).then(function(success) {
        self.loadUser();
        return success;
    }, function (failure) {
        return failure;
    });
  }

  logout() {
    // destroy all firebase refs
    this._userSubscription.unsubscribe();
    this.ngOnInit();
    this.route.navigate(['/login']);
    this.af.auth.logout();
  }
}