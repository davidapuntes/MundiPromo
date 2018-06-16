import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';


@Injectable()
export class ShareProvider {

  private isAndroid: boolean = false;
  private isIos: boolean = false;

  private linkWhatsappAndroid = 'https://play.google.com/store/apps/details?id=com.whatsapp';
  private linkWhatsappIOS = 'https://itunes.apple.com/es/app/whatsapp-messenger/id310633997?mt=8';

  private linkTwitterAndroid = 'https://play.google.com/store/apps/details?id=com.twitter.android';
  private linkTwitterIOS = 'https://itunes.apple.com/es/app/twitter/id333903271?mt=8';

  private linkFacebookAndroid = 'https://play.google.com/store/apps/details?id=com.facebook.lite';
  private linkFacebookIOS = 'https://itunes.apple.com/es/app/facebook/id284882215?mt=8';

  private linkInstagramAndroid = 'https://play.google.com/store/apps/details?id=com.instagram.android';
  private linkInstagramIOS = 'https://itunes.apple.com/es/app/instagram/id389801252?mt=8';




  constructor(private socialSharing: SocialSharing, private alertCtrl: AlertController, private platform: Platform) {
    console.log('Hello ShareProvider Provider');
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.isAndroid = true;

      }

      else if (this.platform.is('ios')) {
        this.isIos = true;


      }




    });
  }



  twitterShare(msg, image,link) {
    this.socialSharing.canShareVia('twitter', null, null, null, null).then((success) => {
      this.socialSharing.shareViaTwitter(msg + "\n Enviado desde ILoveAlcazar App!", image, link);
    }, (error) => {
      this.presentAlert('Información', 'Debe tener la app de Twitter instalada en su terminal', 'twitter');
    });

  }

  whatsappShare(msg, image,link) {
    this.socialSharing.canShareVia('whatsapp', null, null, null, null).then((success) => {

      this.socialSharing.shareViaWhatsApp(msg + "\n Enviado desde ILoveAlcazar App !", image,link);
    }, (error) => {
      this.presentAlert('Información', 'Debe tener la app de Whatsapp instalada en su terminal', 'whatsapp');
    });
  }


  facebookShare(msg, image,link) {
    this.socialSharing.canShareVia('facebook', null, null, null, null).then((success) => {
      this.socialSharing.shareViaFacebook(msg + "\n Enviado desde ILoveAlcazar App!", image, link);
    }, (error) => {
      this.presentAlert('Información', 'Debe tener la app de Facebook instalada en su terminal', 'facebook');
    });
  }

  shareViaInstagram(msg, image) {
    this.socialSharing.canShareVia('instagram', null, null, null, null).then((success) => {
      this.socialSharing.shareViaInstagram(msg + "\n Enviado desde ILoveAlcazar App!", image);
    }, (error) => {
      this.presentAlert('Información', 'Debe tener la app de Instagram instalada en su terminal', 'instagram');
    });

  }


  presentAlert(title, subTitle, app: string) {

    if (app == 'facebook' && this.isAndroid) {

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Facebook',
            handler: () => {
              window.open(this.linkFacebookAndroid);
            }

          }
        ],

      });
      alert.present();
    } else if (app == 'facebook' && this.isIos) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Facebook',
            handler: () => {
              window.open(this.linkFacebookIOS);
            }

          }
        ],

      });
      alert.present();

    }

    else if(app == 'twitter' && this.isAndroid){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Twitter',
            handler: () => {
              window.open(this.linkTwitterAndroid);
            }

          }
        ],

      });
      alert.present();

    }
    else if(app == 'twitter' && this.isIos){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Twitter',
            handler: () => {
              window.open(this.linkTwitterIOS);
            }

          }
        ],

      });
      alert.present();

    }

    else if(app == 'instagram' && this.isAndroid){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Instagram',
            handler: () => {
              window.open(this.linkInstagramAndroid);
            }

          }
        ],

      });
      alert.present();

    }
    else if(app == 'instagram' && this.isIos){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Twitter',
            handler: () => {
              window.open(this.linkInstagramIOS);
            }

          }
        ],

      });
      alert.present();

    }

    else if(app == 'whatsapp' && this.isAndroid){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Whatsapp',
            handler: () => {
              window.open(this.linkWhatsappAndroid);
            }

          }
        ],

      });
      alert.present();

    }

    else if(app == 'whatsapp' && this.isIos){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
          {
            text: 'Descargar Whatsapp',
            handler: () => {
              window.open(this.linkWhatsappIOS);
            }

          }
        ],

      });
      alert.present();

    }

    }


  }


