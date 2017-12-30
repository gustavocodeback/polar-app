import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Geolocation } from '@ionic-native/geolocation';

// Página
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../providers/auth/auth';
import { LocationProvider } from '../providers/location/location';
import { GeoFireProvider } from '../providers/geo-fire/geo-fire';
import { UsersProvider } from '../providers/users/users';

// Inicializa o firebase
const config = {
  apiKey: "AIzaSyBnY_ObTnDWWMJzgA7xKxxiWfe5TvL2puQ",
  authDomain: "singular-79575.firebaseapp.com",
  databaseURL: "https://singular-79575.firebaseio.com",
  projectId: "singular-79575",
  storageBucket: "singular-79575.appspot.com",
  messagingSenderId: "746068017953"
}
firebase.initializeApp( config );

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    NativePageTransitions,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LocationProvider,
    GeoFireProvider
  ]
})
export class AppModule {}
