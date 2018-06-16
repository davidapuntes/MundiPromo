import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import { ShareProvider } from '../../providers/share/share';


/**
 * Generated class for the ProductosPCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos-p-categoria',
  templateUrl: 'productos-p-categoria.html',
})
export class ProductosPCategoriaPage {
  Woocommerce: any;
  page: number;
  category: any;
  productos: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public shareProv:ShareProvider) {

    this.page = 1;
    this.productos = [];   
    this.category = this.navParams.get('category');
   

    this.Woocommerce = WC({
      url: 'http://ilovealcazar.es',
      consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    //En woocommerce puede haber 2 categorías con el mismo nombre, pero NO con el mismo slug
    this.Woocommerce.getAsync('products?filter[category]=' + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.productos = JSON.parse(data.body).products;
    }).catch((error) => console.log("Error cogiendo productos por categoría" + error.message));


  }

  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', { 'product': product });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPCategoriaPage');
  }

  uploadPromotion(){
    this.navCtrl.push('FormularioPage');
  }

  loadMoreProducts(event) {
    this.page++;
    this.Woocommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      let prodAux = JSON.parse(data.body).products;
      for (var i = 0; i < prodAux.length; i++) {
        console.log(prodAux[i]);
        this.productos.push(prodAux[i]);
      }

      console.log("Productos segunda página cogidos... + " + this.productos.length);
      //Tenemos que indicar a Angular que ya debemos terminar la tarea asociada al evento recibido

      event.complete();


      //Si cogemos de una tirada, menos de 10 productos, significará que hemos llegado al final

      if (prodAux < 10) {
        console.log("Ya no hay más productos")
        event.enable(false); //Disable infinite scroll
      }

    }).catch((error) => console.log("Error cogiendo productos " + error.message));
  }

}
