import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
declare const google;

@Injectable()
export class LocationProvider {
  public constructor( public geolocation: Geolocation ) {}

  /**
   * Pega a posicao atual do usuario
   * 
   */
  getCurrentPosition() {
    return new Promise( ( resolve, reject ) => {
      this.geolocation.getCurrentPosition() 
      .then( pos  => {
        resolve( new google.maps.LatLng( pos.coords.latitude, pos.coords.longitude ) );
      }) 
      .catch( err => {
        reject( err );
      })
    });
  }

  /**
   * Pega o endereco atual do usuario
   * 
   */
  getCurrentAddress(): Promise<string> {
    const geocoder = new google.maps.Geocoder;

    // Volta uma promessa
    return new Promise( ( resolve, reject ) => {

      // Pega a posicao atual
      this.getCurrentPosition()
      .then( ( latlng ) => {
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                resolve( results[0]['formatted_address' ] ); 
              } else {
                reject('Endereço não encontrado!');
              }
            } else {
              reject( 'Falha no geocoder!' );
            }
          });
      })
    });
  }
}

// End of file