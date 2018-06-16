import { Component,EventEmitter,Output } from '@angular/core';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Account } from '../../models/account/account.interface';


@Component({
  selector: 'register-form',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  //Vamos a enviar a la página de registro el resultado del registro, para que sea ella la que maneje
  @Output() registerStatus:EventEmitter<LoginResponse>;

  account={} as Account; //Nueva forma de instanciar vacío (se inicializa)

  /* Inyectamos el servicio  creado en el constructor */
  constructor (private auth:AuthProvider,private toast:ToastController) {
   
    this.registerStatus=new EventEmitter();

      }

  async register(){
      try{
    const resultado= await this.auth.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(resultado); //Emite el objeto LoginResponse con su subojeto result relleno (positivo)

  }

    catch (e){
      this.registerStatus.emit(e);
      //Emite el objeto loginResponse con su subobjeto error relleno por la promise (negativo)
    }
  }
}

