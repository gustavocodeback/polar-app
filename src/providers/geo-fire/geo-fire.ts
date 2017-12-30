import { LocationProvider } from './../location/location';
import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import * as GeoFire from 'geofire';
import * as firebase from 'firebase';

@Injectable()
export class GeoFireProvider {

  /**
   * Método construtor
   * 
   * @param authProvider 
   * @param locationProvider 
   */
  constructor(  public authProvider: AuthProvider,
                public locationProvider: LocationProvider ) {
  }

  /**
   * Seta a posicao do usuario no geofire
   * 
   */
  setUserPosition() {

    // Pega o usuario logado
    const user = this.authProvider.user();

    // Verifica se existe o usuario logado
    if ( user ) {
      this.locationProvider.getCurrentPosition().then( pos => {
        const geoFire = new GeoFire( firebase.database().ref( 'geofire' ) );
        geoFire.set( user.uid, [ pos.lat(), pos.lng() ] );
      });
    }
  }

  /**
   * Vigia a posicao do usuario
   * 
   */
  watchUserPosition() {
     // Pega o usuario logado
     const user = this.authProvider.user();

     // Verifica se existe o usuario logado
     if ( user ) {
       this.locationProvider.watchPosition().subscribe( pos => {
         const geoFire = new GeoFire( firebase.database().ref( 'geofire' ) );
         geoFire.set( user.uid, [ pos.coords.latitude, pos.coords.longitude ] );
       });
     }
  }
}

// End of file
