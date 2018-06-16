import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { ImageProvider } from '../../providers/image/image';
import { EmailProvider } from '../../providers/email/email';
import { DatabaseProvider } from '../../providers/database/database';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { ObjetoInformacion } from '../../models/objetoInfo/objetoInfo.interface';
import { attachEmbeddedView } from '@angular/core/src/view';


@Component({
  selector: 'formulario-component',
  templateUrl: 'formulario.html'
})
export class FormularioComponent {


  public Emailform: FormGroup;
  attachmentArray: any[];
  private attachment1: any;
  private attachment2: any
  private attachment3: any
  private objetoInfo: ObjetoInformacion;
  private nombreNegocio: string;
  private contadorImagenesMinimas: number = 0;

  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private ImageService: ImageProvider,
    private _DB: DatabaseProvider,
    private AlertService: AlertController,
    private platform: Platform,
    private _PL: PreloaderProvider,
    private alertCtrl: AlertController) {

      //Array que almacenará las imágenes adjuntas
    this.attachmentArray = [this.attachment1, this.attachment2, this.attachment3];

    //Validamos el formulario una vez los campos requeridos estén debidamente cumplimentados
    this.Emailform = this.formBuilder.group({
      "email": ["", Validators.required],
      "empresa": ["", Validators.required],
      "telefono": ["", Validators.required],
      "direccion": ["", Validators.required],
      "descripcion_corta": ["", Validators.required],
      "descripcion_larga": ["", Validators.required]
    });
  }

  displayMessage(title: string, subTitle: string): void {
    let alert: any = this.AlertService.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillLoad() {
    this.attachmentArray = [];
  }

  sendImages() {
    console.log("Enviando imágenes!!!!!!! ");
    //Recorremos array de imágenes, y cada una que no esté vacía, la subimos al storage de Firebase
    let contador = 0;
    for (var i = 0; i < this.attachmentArray.length; i++) {
      contador++;
      if (this.attachmentArray[i] || this.attachmentArray[i] != null)
        this._DB.uploadImage(this.objetoInfo.empresa + "_" + contador, this.attachmentArray[i]);
    }

    this.objetoInfo = null;
  }

  createObject() {
    //La información completa del formulario, la almacenamos en un objeto para ser enviada a la bbdd de firebase
    this.objetoInfo = {
      descripcion_corta: this.Emailform.get('descripcion_corta').value,
      descripcion_larga: this.Emailform.get('descripcion_larga').value,
      direccion: this.Emailform.get('direccion').value,
      email: this.Emailform.get('email').value,
      empresa: this.Emailform.get('empresa').value,
      telefono: this.Emailform.get('telefono').value,

    }





  }

  //Coge las imágenes en formato base64
  retrieveAttachment(): void {
    this.platform.ready().then(() => {
      var haySitio = false;
      this.ImageService.selectImage()
        .then((attachment: any) => {
          // Assign retrieved image to private property
          // which we'll subsequently access within the
          // sendMessage method
          for (var i = 0; i < this.attachmentArray.length; i++) {
            if (!this.attachmentArray[i] || !this.attachmentArray[i] == null) {
              haySitio = true;
              this.contadorImagenesMinimas++;
              this.attachmentArray[i] = attachment;
              console.log("Esto tiene la imagen ") + attachment;
              break;
            }
          }

          if (!haySitio) {
            this.displayMessage('Información', 'Sólo puede adjutar 3 imágenes');
            for (let attach of this.attachmentArray) {
              console.log(attach);
            }
          }


        });
    });

  }

  volver() {
    this.navCtrl.pop();
  }


  //Enviamos toda la información

  sendInfo() {

    if (this.contadorImagenesMinimas == 0) {
      this.presentAlert();
    }

    else {

      //mostramos loader
      this._PL.displayPreloader();

      //Creamos objeto con la info del formulario
      this.createObject();


      //Subimos ese objeto a firebase database
      this._DB.addToDatabase(this.objetoInfo)
        .then((data) => {
          this._PL.hidePreloader();
          this.sendImages();
          this.promptAlert();

        }, (error) => {
          this._PL.hidePreloader();
          this.displayMessage('Error', 'Se ha producido un fallo. Por favor, inténtelo de nuevo por favor');
          console.error(error);
        });
    }

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Información:',
      subTitle: 'Debe adjuntar al menos 1 fotografía para enviar su oferta',
      buttons: ['OK']
    });
    alert.present();
  }

  eliminaImagen(index){
    for(var i=0;i<this.attachmentArray.length;i++){
      if(i==index){
        this.attachmentArray[i]=null;
      }
    }
    

  }



  promptAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hemos recibido sus datos correctamente. En breve podrá ver su oferta publicada en la aplicación y en la web.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
            //this.sendImages();
            this.navCtrl.setRoot('MenuPage');
            return false;
          }
        }
      ]
    });

    alert.present();


  }
}


