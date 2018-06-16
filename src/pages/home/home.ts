import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import 'rxjs/add/operator/map';
import { ShareProvider } from '../../providers/share/share';
import { PreloaderProvider } from '../../providers/preloader/preloader';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgs: any[] = [];
  Woocommerce: any;
  moreProductos: any[];
  page: number;
  val: any = "";



  /*Vamos a acceder a un componente del html (productSlides)..Lo hacemos a través del ViewChild,
  que nos permite acceder a "hijos" de nuestra página .ts...Hijos serían por ejemplo los elementos del html
  (Recordar que en el html tendremos que darle una identificación ---> #productSlides) */

  @ViewChild('productSlides') productSlides: Slides;


  constructor(public navCtrl: NavController,
    private toast: ToastController,
    public shareProv: ShareProvider,
    private preloader: PreloaderProvider) {

    this.preloader.hidePreloader();

    //Imágenes para slider principal
    this.moreProductos = [];
    this.imgs = [1, 2, 3];
    this.page = 1;

    //WC takes a Json object as a parameter
    this.Woocommerce = WC({
      url: 'http://ilovealcazar.es',
      //Claves obtenidas en Woocommerce generate api de nuestra tienda
      consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });


    this.initializeItems();

  }



  initializeItems() {
    this.preloader.displayPreloader();
    //Coger productos para mostrarlos en el slider
    //El primer parámetro indica lo que estamos importando (productos)
    //Installar en google chrome la extensión allow-control allow-origin para que no de problema al solicitar desde localhost
    this.Woocommerce.getAsync('products').then((data) => {
      //Los productos están guardados en Data--->Body..> products
      //Aquí usaremos JSON.parse, poruqe al contrario que con los Observables, no podemos mapear las promises
      console.log(JSON.parse(data.body));
      //Cada carga coge 10 productos, 1 página
      this.moreProductos = JSON.parse(data.body).products;
      this.preloader.hidePreloader();
    }).catch((error) => console.log("Error cogiendo productos " + error.message));
  }


  ionViewDidEnter() {
    //Programamos el autoplay de los slider que no funciona

    setInterval(() => {
      //Cuando llegue al último, que vuelva

      if (this.productSlides.getActiveIndex() === (this.productSlides.length() - 1)) {
        this.productSlides.slideTo(0);
      }
      this.productSlides.slideNext();
    }, 3000);
  }



  loadMoreProducts(event) {
    this.page++;
    let arrayAux: any[] = [];

    this.Woocommerce.getAsync('products?page=' + this.page).then((data) => {
      let prodAux = JSON.parse(data.body).products;
      for (var i = 0; i < prodAux.length; i++) {
        console.log(prodAux[i]);
        arrayAux.push(prodAux[i]);
      }
      event.complete();


      //Si cogemos de una tirada, menos de 10 productos, significará que hemos llegado al final
      if (prodAux.length < 10) {
        console.log("Ya no hay más productos")
        event.enable(false); //Disable infinite scroll
      }


      // console.log("Productos página " + this.page + " cogidos...  " + this.moreProductos.length);
      //Tenemos que indicar a Angular que ya debemos terminar la tarea asociada al evento recibido


      if (!(this.val) || (this.val.trim() == '')) {
        console.log("pasa por filtro complicado");
        for (let o of arrayAux) {
          this.moreProductos.push(o);
        }
        //this.moreProductos = arrayAux.slice();
      }

      else {
        let auxMore = arrayAux.filter((item) => {
          return (item.title.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
        });
        for (let au of auxMore) {
          this.moreProductos.push(au);


        }

      }
    }).catch((error) => console.log("Error cogiendo productos " + error.message));

  }


  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', { 'product': product });
  }


  uploadPromotion() {
    this.navCtrl.push('FormularioPage');
  }

  getItems(ev: any) {
    this.preloader.displayPreloader();
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    this.val = ev.target.value;
    console.log("this val ---> " + this.val);

    // if the value is an empty string don't filter the items
    if (this.val && this.val.trim() != '') {
      /*let productosFiltrados:any[]=[];
      for(let prod of this.moreProductos){
        if(prod.title.includes(this.val) || prod.short_description.includes(this.val)){
          productosFiltrados.push(prod);
        }
      }
      this.moreProductos = productosFiltrados.slice();*/
      this.moreProductos = this.filterItems();
      this.preloader.hidePreloader();
    }

    else {
      this.preloader.hidePreloader();
      this.moreProductos = [];
      this.page = 1;
      this.initializeItems();
    }
  }


  filterItems() {
    return this.moreProductos.filter((item) => {
      return item.title.toLowerCase().indexOf(this.val.toLowerCase()) > -1 || item.short_description.toLowerCase().indexOf(this.val.toLowerCase()) > -1
    });

  }
}
