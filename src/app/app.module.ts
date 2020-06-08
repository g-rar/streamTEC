import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { VideosComponent } from './pages/videos/videos.component';
import { MusicComponent } from './pages/music/music.component';
import { OwnedComponent } from './pages/owned/owned.component';

import { AngularFireModule } from '@angular/fire/';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SideMenuComponent } from './sub-components/side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './pages/login/login.component';
import { AddContentComponent } from './pages/add-content/add-content.component';
import { ProductCardComponent } from './sub-components/product-card/product-card.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';


var firebaseConfig = {
  apiKey: "AIzaSyAvUnA2LOmzinqIqMtG69mwQTAYmvY-scY",
  authDomain: "streamtec-g.firebaseapp.com",
  databaseURL: "https://streamtec-g.firebaseio.com",
  projectId: "streamtec-g",
  storageBucket: "streamtec-g.appspot.com",
  messagingSenderId: "1014164653626",
  appId: "1:1014164653626:web:f6f6207566524d537d5703"
};


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideMenuComponent,
    RegUserComponent,
    VideosComponent,
    MusicComponent,
    OwnedComponent,
    ProfileComponent,
    LoginComponent,
    AddContentComponent,
    ProductCardComponent,
    ProductViewComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    InlineSVGModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
