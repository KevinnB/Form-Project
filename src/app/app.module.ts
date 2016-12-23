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
import { PageFormComponent } from './form/form.component';
import { PageNotAuthorizedComponent } from './not-authorized/not-authorized.component';
// Components
import { StatusComponent } from './status/status.component';


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
    component: PageFormComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'not-authorized',
    component: PageNotAuthorizedComponent,
    canActivate: [ AuthGuard ]
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
    PageFormComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    PageNotAuthorizedComponent  ],
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
