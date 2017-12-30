import { Nav } from 'ionic-angular/components/nav/nav';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { GeoFireProvider } from '../providers/geo-fire/geo-fire';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  /**
   * Pagina inicial
   */
  rootPage:any = LoginPage;

  /**
   * Seta o viewchild
   * 
   */
  @ViewChild(Nav) nav: Nav;

  /**
   * Método constructor
   * 
   * @param platform 
   * @param statusBar 
   * @param nativePageTransitions 
   * @param splashScreen 
   */
  constructor(  platform: Platform, 
                statusBar: StatusBar,
                geoFire: GeoFireProvider,
                nativePageTransitions: NativePageTransitions,
                splashScreen: SplashScreen ) {

    // Quando a plataforma estiver pronta
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // Verifica se é um app
      if ( (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080')) ) {
        const options: NativeTransitionOptions = {
          direction: 'up',
          duration: 500,
          slowdownfactor: 3,
          slidePixels: 20,
          iosdelay: 100,
          androiddelay: 150,
          fixedPixelsTop: 0,
          fixedPixelsBottom: 60
          };
        nativePageTransitions.fade(options); 
      }

      // Seta o firebase
      firebase.auth().onAuthStateChanged( user => {

        // Verifica se existe o usuário
        if ( !user ) {
          this.nav.setRoot( LoginPage );
        } else {
          geoFire.setUserPosition();
        }
      });
    });
  }
}

// End of file