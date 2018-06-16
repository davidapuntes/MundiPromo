import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cupon',
  templateUrl: 'cupon.html',
})
export class CuponPage {

  titulo:string;
  establecimiento:string;

  //Esta página será abierta a través de un modal. Mostrará la información del
  //título de la promoción y del establecimiento que la ofrece

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.titulo=this.navParams.get('titulo');
    this.establecimiento=this.navParams.get('establecimiento');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuponPage');
  }

  volver() {
    this.navCtrl.pop();
  }

}
