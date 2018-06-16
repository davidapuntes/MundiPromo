import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';


@Injectable()
export class EmailProvider {

  //--------------------------- FUNCIONALIDAD ANTICUADA, NO ES USADA PERO NO LA BORRAMOS -------------------

  constructor(private _EMAIL: EmailComposer,private AlertService:AlertController) { }

  sendEmail(to: any,
    cc: any,
    subject: string,
    body: string,
    attachment_1: any,
    attachment_2?: any,
    attachment_3?: any,): void {
    // Use the plugin isAvailable method to check whether
    // the user has configured an email account
    this._EMAIL.isAvailable()
      .then((available: boolean) => {

        // Check that plugin has been granted access permissions to
        // user's e-mail account
        this._EMAIL.hasPermission()
          .then((isPermitted: boolean) => {

            // Define an object containing the
            // keys/values for populating the device
            // default mail fields when a new message
            // is created
            let email: any = {
              app: 'mailto',
              to: to,
              cc: cc,
              attachments: [
                attachment_1,
                attachment_2,
                attachment_3

              ],
              subject: subject,
              body: body,
              isHtml:true
            };

            // Open the device e-mail client and create
            // a new e-mail message populated with the
            // object containing our message data
            this._EMAIL.open(email);
          })
          .catch((error: any) => {
            console.log('No access permission granted');
            console.dir(error);
          });
      })
      .catch((error: any) => {
        console.log('User does not appear to have device e-mail account');
        this.displayMessage('Información','Es necesaria una cuenta de e-mail configurada en su dispositivo');
        console.dir(error);
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

}
