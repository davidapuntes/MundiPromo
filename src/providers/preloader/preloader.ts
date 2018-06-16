import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreloaderProvider {

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
