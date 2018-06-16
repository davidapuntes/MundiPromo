import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { Facebook } from '@ionic-native/facebook'
import { Observable } from 'rxjs/Observable';
import { Platform, App } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { PreloaderProvider } from '../preloader/preloader';


@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;
  provider: any;


  constructor(private auth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform,
    private app: App,
    private loading: PreloaderProvider
  ) {

    firebase.auth().useDeviceLanguage();
    this.user = this.auth.authState;


  }


  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        //Creamos objeto con las credenciales del usuario de facebook
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
        //Se las pasamos a firebase
        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
          }, (error) => {
            console.log("Firebase error: " + JSON.stringify(error));

          });

      }, (error) => {
        return error;
      });
  }



  getAuthenticatedUser() {
    return this.auth.authState; //Devuelve Observable de tipo User
  }


  //Función de logeo
  async login(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }

    } catch (e) {

      return <LoginResponse>{
        error: e
      }

    }
  }

  //Recordamos que async permitía ingresar el resultado de una promise directamente en la variable, con el await,
  //sin tener que hacer then=>

  //Devolverá un objeto LoginResponse, relleno con su respectivo subobjeto según el resultado

  //Función de registro
  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }


  signOut() {
    this.auth.auth.signOut();
  }

  loginWithGoogle(): Promise<any> {

    return new Promise((resolve, reject) => {


      const provider = new firebase.auth.GoogleAuthProvider();
      this.loading.displayPreloader();

      firebase.auth().signInWithRedirect(provider).then(() => {
        firebase.auth().getRedirectResult().then(result => {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;         
          resolve();
          console.log(token, user);
        }).catch(function (error) {
          this.loading.hidePreloader();
          reject();
          // Handle Errors here.
          console.log(error.message);
        });
      }).catch((error) => {
        this.loading.hidePreloader();
        reject();
        // Handle Errors here.
        console.log(error.message);
      });


    });

  }




}

