import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  /**
   * Método construtor
   * 
   * @param facebook 
   */
  constructor( public facebook: Facebook ) {}

  /**
   * Pega o usuário logado
   * 
   */
  public user() {

    // pega o usuario atual
    const user = Object.keys( window.localStorage )
                  .filter( item => item.startsWith( 'firebase:authUser' ) )[0];

    // verifica se existe um usuario
    if ( user ) {
      return JSON.parse( localStorage.getItem( user ) );
    } else return false;
  }

  /**
   * Faz login com o Facebook
   * 
   */
  public login() {
    return new Promise( ( resolve, reject ) => {

      // Verifica se já não existe um usuário logado
      if ( this.user() ) {
        resolve( this.user() );
        return;
      }

      // Faz o login com o facebook
      this.facebook.login( [ 'public_profile', 'user_friends', 'email' ] )
      .then( ( response: FacebookLoginResponse ) => {
  
        // Pega as credenciais com o firebase
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
  
        // Faz o login com o firebase
        firebase.auth().signInWithCredential( facebookCredential )
        .then( success => resolve( this.user() ) )
        .catch( e => reject( e ) );
      })
      .catch( e => reject( e ) );
    });
  }
}

// End of file
