import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Página
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../providers/auth/auth';

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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
