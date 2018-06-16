import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NavController, ToastController, Alert, AlertController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { Account } from '../../models/account/account.interface';
import firebase from 'firebase';
import { FormularioPage } from '../../pages/formulario/formulario';
import { PreloaderProvider } from '../../providers/preloader/preloader';




@Component({
  selector: 'login-form',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  account = {} as Account;

  /* Lo contrario que el input...Ahora el componente Login pasará información al padre...(En vez de recibir
  como con el imput...pasará un EventEmitter con la respuesta (result para satisfactoria y error para negativa)) */
  @Output() loginStatus: EventEmitter<LoginResponse>;


  constructor(public auth: AuthProvider, private navCtrl: NavController, private toast: ToastController,
    private alertCtrl: AlertController, private loading: PreloaderProvider) {
    //Hay que instanciarlo, ya que al tener el decorator output no lo hemos podido poner en el constructor
    this.loginStatus = new EventEmitter<LoginResponse>();

  }



  async login() {
    try {
      this.loading.displayPreloader();
      //Resolvemos el login
      const resultado = await this.auth.login(this.account);
      //Y enviamos el resultado a la página login, para que sea la encargada de decidir
      this.loginStatus.emit(resultado);

    }

    catch (e) {
      this.loginStatus.emit(e);

    }

  }

  loginWithFacebook() {

    this.auth.facebookLogin().then((response) => {

      //Con una "NO RESPUESTA " o respuesta undefined, significa que el login con facebook ha sido
      //satisfactorio, por tanto dirigimos al menú
      if (!response) {
        this.loading.displayPreloader();
        this.navCtrl.setRoot('MenuPage');
      }

      else {
        if (response.errorCode) {
          
        //Por el contrario, todo objeto JSON respuesta, con un errorCode, significa obviamente un error
        //NO DEBE PASAR AL MENÚ
          this.loading.hidePreloader();
          console.log("Error autenticando con facebook " + response.error.json());
        }

        else {
          //Por si acaso hay algún otro tipo de respuesta, SIN ERROR (dirigimos al menú)
          this.loading.displayPreloader();
          this.navCtrl.setRoot('MenuPage');
        }
      }
    });
  }

  loginWithGoogle() {

    //Vemos como el funcionamiento del login con Facebook y con Google es muy similar...
    //Simplemente aquí el control de las respuestas se ha llevado de forma algo diferente
    //pero igualmente efectiva


    this.auth.loginWithGoogle().then((response) => {

      if(response){
        if (response.errorCode) {
          this.loading.hidePreloader();
          console.log("Error autenticando con google " + response.error.json());
        }
      }      

      else {
        this.navCtrl.setRoot('MenuPage');
      }

    }, (error) => {
      this.loading.hidePreloader();
      console.log("Error autenticando con google " + error.message.json());

    });
  }

  NavigateToPageRegister(page: string) {
    this.navCtrl.push('RegisterPage');
  }

  resetPassword(email: string): Promise<void> {
    //Para pedir un reseteo de contraseña, debemos rellenar el campo e-mail
    if (!email || email == "") {
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: 'Debe rellenar su e-mail para resetear su contraseña',
        duration: 4000
      }).present();
    }

    else {
      //El reseto de contraseña es un proceso que maneja enteramente firebase
      return firebase.auth().sendPasswordResetEmail(email).then
        (
        user => {
          const alert = this.alertCtrl.create({
            message: "Comprueba tu bandeja de entrada para resetear la contraseña",
            buttons: [
              {
                text: "Ok",
                role: "cancel",
                handler: () => {

                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          errorAlert.present();
        }
        );

    }
  }

  uploadPromotion() {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.presentAlert('Información', 'Por favor inicie sesión para continuar');
        unsubscribe();
      } else {
        this.navCtrl.push(FormularioPage);
      }
    });
  }

  presentAlert(titulo: string, contenido: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: contenido,
      buttons: ['OK']
    });
    alert.present();
  }



}
