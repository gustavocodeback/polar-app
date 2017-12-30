import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
  user() {

    // pega o usuario atual
    const user = Object.keys( window.localStorage ).filter( item => item.startsWith( 'firebase:authUser' ) )[0];

    // verifica se existe um usuario
    if ( user ) {
      return JSON.parse( localStorage.getItem( user ) );
    } else return false;
  }

  /**
   * Seta o perfil do usuário
   * 
   */
  setProfile() {

    // Verifica o usuario
    const user = this.user();
    if ( !user ) return;

    // Seta os dados do perfil
    const data = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    };

    // Grava o item no firebase
    firebase.database().ref( `users/${user.uid}` ).set( data );
  }

  /**
   * Faz login com o Facebook
   * 
   */
  login() {
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
        .then( success => {
          this.setProfile();
          resolve( this.user() );
        })
        .catch( e => reject( 'Erro ao logar com o Facebook.' ) );
      })
      .catch( e => reject( 'Erro ao logar com o Facebook.' ) );
    });
  }

  /**
   * Faz o logout do sistema
   * 
   */
  logout() {
    return firebase.auth().signOut();
  }
}

// End of file
