import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { AngularFireModule } from 'angularfire2';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDkh90S7obXXQ8Q2Z87OVNEyY3cLlnETy8",
  authDomain: "form-project-298e2.firebaseapp.com",
  databaseURL: "https://form-project-298e2.firebaseio.com",
  storageBucket: "form-project-298e2.appspot.com",
};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 

}
