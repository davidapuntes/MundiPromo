import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import firebase from 'firebase';
import { Network } from '@ionic-native/network';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider,
    private network:Network,private alertCtrl:AlertController) {
    this.initializeApp();



  }
  initializeApp() {
    this.platform.ready().then(() => {
      if(this.network.type != 'none'){
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.rootPage = 'LoginPage';
          unsubscribe();
        } else {
          this.rootPage = 'MenuPage';
          unsubscribe();
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
     // this.splashScreen.hide();
    }
    else{
      this.splashScreen.hide();
      this.presentConfirm();
    }
    });
  
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      message: 'Ha de tener conexión wifi o datos para usar la aplicación',
      buttons: [
             {
          text: 'OK',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

}
