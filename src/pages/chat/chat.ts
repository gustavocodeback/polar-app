import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  /**
   * Mensagem
   * 
   */
  public message: string = '';

  public rows = 1;

  /**
   * Método constructor
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams) {
  }

  contarLinhas() {
    let parts = this.message.split( /\r*\n/ );
    let count = parts.length;
    this.rows = count < 5 ? count : 5;    
  }

  enviarMensagem() {
    console.log( this.message );
  }
}

// End of file
