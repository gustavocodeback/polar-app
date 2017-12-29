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

  public login() {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then( ( response: FacebookLoginResponse ) => {

      // Pega as credenciais com o firebase
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      // Faz o login com o firebase
      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify( success ) ); 
        });
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

}

// End of file
