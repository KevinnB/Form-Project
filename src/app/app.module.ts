import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './auth/auth.service';
import { AngularFireModule } from 'angularfire2';

// Root
import { AppComponent } from './app.component';

// Pages
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageHomeComponent } from './home/home.component';

import { PageFormListComponent } from './form/list/formList.component';
import { PageFormAddComponent } from './form/add/formAdd.component';

import { PageNotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PageLoginComponent } from './login/login.component';

// Components
import { StatusComponent } from './status/status.component';
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
    path: 'home',
    component: PageHomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'forms',
    component: PageFormListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'not-authorized',
    component: PageNotAuthorizedComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    PageFormListComponent,
    PageFormAddComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    PageNotAuthorizedComponent,
    PageLoginComponent,
    UserProfileComponent  
    ],
  imports: [
    //MaterialModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 

}
