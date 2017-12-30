import { UsersService } from './../../services/users/users';
import { LocationProvider } from './../../providers/location/location';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as GeoFire from 'geofire';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ UsersService ]
})
export class HomePage {

  /**
   * Usuarios proximos
   * 
   */
  public nearbyUsers = [];

  /**
   * Método construtor
   * 
   * @param navCtrl 
   * @param userService 
   * @param location 
   * @param auth 
   */
  constructor(  public navCtrl: NavController,
                public userService: UsersService,
                public location: LocationProvider,
                public auth: AuthProvider ) {
  }

  /**
   * Quando entrar na tela
   * 
   */
  ionViewDidEnter(){
    this.userService.getNearbyUsers()
    .then( observer => {
      if ( observer ) {
        observer.subscribe( data => {

          // Verifica se o usuário já não foi adicionado
          for( let user of this.nearbyUsers ) {
            if ( user.uid == data.key ) return;
          }

          // Pega o usuario
          this.userService.gerUser( data.key )
          .then( user => {
            user['uid'] = data.key;
            this.nearbyUsers.push( user );
          })
          .catch( err => console.log( err ) );
        });
      }
    });
  }

  /**
   * Abre o chat
   * 
   */
  openChat() {
    this.navCtrl.push( 'ChatPage' );
  }

  /**
   * Faz o logout do sistema
   * 
   */
  doLogout() {
    this.auth.logout();
  }
}

// End of file