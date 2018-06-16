import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { AuthProvider } from '../auth/auth';
import { DatePipe } from '@angular/common'


@Injectable()
export class DatabaseProvider {

  myPicRef: any;

  constructor(public http: Http,public datepipe: DatePipe) {

    
  }


  //Envía información a la database de Firebase
  addToDatabase(offerObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('ofertas');
      addRef.push(offerObj);
      resolve(true);
    });
  }

  //Envía imágen al storage de Firebase
uploadImage(nombreNegocio,image){
      let fecha=new Date();
      let Ffinal=this.datepipe.transform(fecha, 'yyyy-MM-dd HH:mm');     
      this.myPicRef = firebase.storage().ref(`/${nombreNegocio},${Ffinal}`);
      this.myPicRef.putString(image.substring(23), 'base64',{contentType:'image/jpg'}).then(() => {
        console.log('Image uploaded');
      });
    }




}
