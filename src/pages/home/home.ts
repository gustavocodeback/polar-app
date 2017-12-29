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

  doLogin() {
    this.auth.login();
  }

  openChat() {
    this.navCtrl.push( 'ChatPage' );
  }
}

// End of file