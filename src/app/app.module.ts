import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuardLoggedIn } from './shared/auth/guard.loggedIn';

import { AngularFireModule, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';

// Root
import { AppComponent } from './app.component';
import { ApplicationSettings } from './shared/appSettings.model';

// Pages
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PageFormListComponent } from './form/list/formList.component';
import { PageFormDetailsComponent } from './form/details/formDetails.component';
import { PageFormAddComponent } from './form/add/formAdd.component';

import { PageNotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PageLoginComponent } from './login/login.component';

// Components
import { UserProfileComponent } from './user-profile/user-profile.component';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDkh90S7obXXQ8Q2Z87OVNEyY3cLlnETy8",
  authDomain: "form-project-298e2.firebaseapp.com",
  databaseURL: "https://form-project-298e2.firebaseio.com",
  storageBucket: "form-project-298e2.appspot.com",
};

const appRoutes: Routes = [
  //{ path: 'crisis-center', component: CrisisListComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'forms',
    component: PageFormListComponent,
    canActivate: [ AuthGuardLoggedIn ]
  },
  {
    path: 'forms/:id',
    component: PageFormDetailsComponent,
    canActivate: [ AuthGuardLoggedIn ]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [ AuthGuardLoggedIn ]
  },
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'not-authorized',
    component: PageNotAuthorizedComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  { path: '',
    redirectTo: '/forms',
    pathMatch: 'full',
  },

  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PageFormListComponent,
    PageFormDetailsComponent,
    PageFormAddComponent,
    PageNotFoundComponent,
    PageNotAuthorizedComponent,
    PageLoginComponent,
    UserProfileComponent  
    ],
  imports: [
    MaterialModule.forRoot(),
    // NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      method: AuthMethods.Popup
    })
  ],
  providers: [
    AuthService,
    AuthGuardLoggedIn,
    ApplicationSettings
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 

}
