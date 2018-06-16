import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginResponse } from '../../models/login/loginResponse.interface';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private mensajeEspanol:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(event:LoginResponse){
    if(!event.error){
      this.toast.create({
        /* Ver uso de template literal strings  */
        message : `Registro correcto ${event.result.email}`,
        duration : 3000
      }).present().then(()=>{
        this.navCtrl.setRoot('LoginPage');
      })
   
  }

  else{
    let mensajeError=event.error.code;
    console.log(event.error.code);
   
      this.mensajeEspanol="";
      switch(mensajeError) { 
        case 'auth/email-already-in-use': { 
          this.mensajeEspanol='El usuario elegido ya está registrado'; 
           break; 
        } 

        case 'auth/invalid-email': { 
          this.mensajeEspanol='Email no válido'; 
           break; 
        } 
        case 'auth/weak-password': { 
          this.mensajeEspanol='La contraseña ha de tener al menos 6 caracteres'; 
           break; 
        } 

        default: { 
          this.mensajeEspanol='Problema con su registro. Asegúrese de que sus datos y conexión son correctos.';  
           break; 
        } 
     }
    this.toast.create({
      /* Ver uso de template literal strings  */
      message : `Registro incocorrecto ${ this.mensajeEspanol}`,
      duration : 3000
    }).present();
  }

}
}
