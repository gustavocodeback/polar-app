import { HomePage } from './../home/home';
import { LocationProvider } from './../../providers/location/location';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LocationProvider ]
})
export class LoginPage {

  /**
   * Progresso do login
   * 
   */
  progress = 0;

  /**
   * Mensagem de status
   * 
   */
  message = 'Olá, seja bem-vindo!';

  /**
   * Intervalo da animacao
   * 
   */
  animationInterval = 4;

  /**
   * Imagem do perfil
   * 
   */
  profilePicture;

  /**
   * Foto de perfil temporária
   * 
   */
  tempUrl;

  /**
   * Metodo construtor
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(  public platform: Platform,
                public navParams: NavParams,
                public navCtrl: NavController,
                public authProvider: AuthProvider,
                public locationProvider: LocationProvider ) {
  }

  /**
   * Verifica se pode entrar
   * 
   */
  ionViewCanEnter(){
    if ( this.authProvider.user() ) {
      setTimeout(() => {
        this.navCtrl.setRoot( HomePage );
      }, 0);
      return false;
    } else return true;
  }

  /**
   * Faz a progressao do progress bar
   * 
   * @param num 
   */
  progressTo( num ) {
    return new Promise( ( resolve, reject ) => {
      const itv = setInterval( () =>{
        if ( this.progress < num ) {
          this.progress++;
        } else {
          clearInterval( itv );
          resolve( true );
        }
      }, 100);
    });
  }

  /**
   * Pega a animação dos aneis
   * 
   * @param reverse 
   */
  getAnimation( reverse = false ) {
    const animation = reverse ? 'lds-double-ring_reverse' : 'lds-double-ring';
    const attr = `${animation} ${this.animationInterval}s linear infinite`;
    return attr;
  }

  /**
   * Acelera o spinner
   * 
   */
  accelarate() {
    return new Promise( ( resolve, reject ) => {
      const interval = setInterval( () => {
        this.animationInterval -= 0.1;
        if ( this.animationInterval <= 0 ) {
          resolve( true );
          clearInterval( interval );
        }
      }, 40);
    });
  }

  /**
   * Reduz o spinner
   * 
   */
  reduce() {
    return new Promise( ( resolve, reject ) => {
      const interval = setInterval( () => {
        this.animationInterval += 0.1;
        if ( this.animationInterval >= 4 ) {
          resolve( true );
          clearInterval( interval );
        }
      }, 40);
    });
  }

  /**
   * Animacao depois que o login for feito
   * 
   */
  async animateAfterLogin() {
    this.progressTo( 80 );
    await this.accelarate();

    // Seta a url da fotoa
    this.profilePicture = this.tempUrl;
    let name = this.authProvider.user().displayName;
    await this.reduce();

    // Seta o nome de display
    name = name ? name : this.authProvider.user().email;
    this.message = `Bem-vindo, ${name}`;

    // Pega a localização
    this.getLocation();
  }

  /**
   * Pega a localização
   * 
   */
  async getLocation() {
    this.message = 'Obtendo sua localização ...';
    this.progressTo( 95 );    
    try {

      // Pega o endereço
      const address = await this.locationProvider.getCurrentAddress();
      console.log( address );
      this.message  = address;      
    } catch (error) {
      this.message = 'Não conseguimos obter sua localização.';      
    }
    await this.progressTo( 100 );    
          
    this.navCtrl.setRoot( HomePage );
  }

  /**
   * Faz o login do usuário
   * 
   */
  async doLogin() {
    this.message  = 'Conectando ao facebook ...';
    await this.progressTo( 30 );
    
    // Faz o login
    try {
      await this.authProvider.login();
      this.message = 'Carregando informações do perfil ...';      
      await this.progressTo( 50 );
      
      // Faz a animação depois do login
      this.animateAfterLogin();
      this.tempUrl = this.authProvider.user().photoURL;

    } catch (error) {
      this.message = 'Não foi possivel conectar ao facebook!';
      this.progress = 100;
    }
  }
}

// End of file