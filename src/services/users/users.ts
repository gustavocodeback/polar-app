import { LocationProvider } from './../../providers/location/location';
import { AuthProvider } from './../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GeoFire from 'geofire';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  /**
   * Instancia do GeoFire
   */
  public geoFire;

  /**
   * Instancia do GeoQuery
   * 
   */
  public geoQuery;

  /**
   * Método constructor
   * 
   * @param authProvider
   * @param location 
   */
  constructor(  public authProvider: AuthProvider,
                public location: LocationProvider ){
    this.geoFire = new GeoFire( firebase.database().ref( 'geofire' ) );
  }

  /**
   * Pega usuarios proximos
   * 
   */
  public async getNearbyUsers(): Promise<any> {
    try {

      // Pega a posicao atual
      const pos = await this.location.getCurrentPosition();

      // Seta o geoQuery
      const geoQuery = this.geoFire.query({
        center: [ pos.lat(), pos.lng()],
        radius: 10.5
      });

      // Seta o ui
      const uid = this.authProvider.user().uid;

      // Cria o observer
      return new Observable( observer => {
        let count = 0;

        // Quando alguem entrar
        geoQuery.on( "key_entered", function( key, location, distance ) {
          if ( uid != key && count <= 10 ) {
            observer.next( { key, location, distance } );
            count++;
          }
        });

        // Quando alguem sair
        geoQuery.on("key_exited", function(key, location, distance) {
          if ( uid != key ) {
            observer.next( { key, location, distance } );
            count--;
          }
        });
      });
    } catch ( error ) {
      return false; 
    }
  } 

  /**
   * Pega um usuario pelo id
   * 
   * @param uid 
   */
  public gerUser( uid ) {
    return new Promise( ( resolve, reject ) => {
      firebase.database().ref( `users/${uid}` ).once( 'value' )
      .then( snap => resolve( snap.val() ) )
      .catch( err => reject( {} ) );
    });
  }
}

// End of file
