import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {Value2Component} from './value2/value2.component';
import { from } from 'rxjs';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service' 
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './Register/Register.component';

@NgModule({
  declarations: [
    AppComponent,
    Value2Component,
    NavComponent,
    HomeComponent,
    RegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
