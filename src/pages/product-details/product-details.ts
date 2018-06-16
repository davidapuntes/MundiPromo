import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  Woocommerce: any;
  reviews: any[] = [];
  longitud: any;
  latitud: any;
  @ViewChild('map') mapDiv: ElementRef; //Cogemos el elemento etiquetado como map en el html
  map: GoogleMap;
  atributos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
    private googleMaps: GoogleMaps,public modalCtrl: ModalController
  ) {
    this.platform.ready().then(() => {
      this.product = this.navParams.get('product');
      console.log(this.product);
      this.atributos = [];

      this.Woocommerce = WC({
        url: 'http://ilovealcazar.es',
        consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
        consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
      });

      /*Vamos a coger las reviews u opiniones que tenga cada producto
      this.Woocommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
        this.reviews = (JSON.parse(data.body).product_reviews);
        console.log(this.reviews);
      }).catch((error) => console.log("Error cogiendo reviews " + error.message));
  */

      //Vamos a coger la dirección
      this.atributos = this.product.attributes;

      if (this.atributos.length > 0) {

        for (let att of this.atributos) {

          if (att.name == "longitud") {
            this.longitud = att.options[0];
          }

          else if (att.name == "latitud") {
            this.latitud = att.options[0];
          }
        }


      }
    });
    console.log("Coordenadas " + this.longitud + " " + this.latitud);
  }


  ionViewDidLoad() {
    this.loadMap();

  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitud, // default location
          lng: this.longitud // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(this.mapDiv.nativeElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        // this.getPosition();
        this.map.addMarker({
          //title: this.product.short_description,
          icon: 'blue',
          animation: 'DROP',
          position: { lat: this.latitud, lng: this.longitud },
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  uploadPromotion() {
    this.navCtrl.push('FormularioPage');
  }

  obtenerCodigo(){
    console.log("click!");
     let modal = this.modalCtrl.create('CuponPage', { titulo: this.product.title,establecimiento:this.product.short_description  });
     modal.present();
    }
  }



