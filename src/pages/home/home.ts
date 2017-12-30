import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(  public navCtrl: NavController, 
                public auth: AuthProvider ) {
  }


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