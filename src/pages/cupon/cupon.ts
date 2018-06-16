import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CuponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupon',
  templateUrl: 'cupon.html',
})
export class CuponPage {

  titulo:string;
  establecimiento:string;

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
