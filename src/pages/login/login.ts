import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private mensajeEspanol: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toast: ToastController,
  private loading:PreloaderProvider,private splash:SplashScreen) {

  }

  ionViewWillLoad(){
    this.splash.hide();
  }
 



  login(event: LoginResponse) {
    //Si no hay error en el evento recibido, que sea la página login la que me lleve a la profile
    if (!event.error) {
      this.navCtrl.setRoot('MenuPage');
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: `Bienvenido a MilPromos ${event.result.email}`,
        duration: 3000
      }).present();
    }

    //Si hay un error, que muestre el error
    else {
      let mensajeError = event.error.code;
      this.mensajeEspanol = "";
      switch (mensajeError) {

        case 'auth/user-not-found': {
          this.mensajeEspanol = 'No existe el usuario especificado';
          break;
        }
        case 'auth/invalid-email': {
          this.mensajeEspanol = 'Email no válido';
          break;
        }
        case 'auth/wrong-password': {
          this.mensajeEspanol = 'Contraseña incorrecta';
          break;
        }


        default: {
          this.mensajeEspanol = 'Problema con la autenticación. Asegúrese de que sus datos y su conexión son correctos';
          break;
        }
      }
      this.loading.hidePreloader();
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: `Error : ${this.mensajeEspanol}`,
        duration: 4000
      }).present();
    }
  }
}