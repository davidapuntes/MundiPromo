import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';




@Injectable()
export class PreloaderProvider {

  //Simple servicio para mejorar la funcionalidad del Loading Controller de Ionic

  private loading: any;

  constructor(public http: Http,
    public loadingCtrl: LoadingController) {
  }



  displayPreloader(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });

    this.loading.present();
  }



  hidePreloader(): void {

    if (this.loading && this.loading != null) {
      this.loading.dismiss();
      this.loading=null;
    }

  }

}
