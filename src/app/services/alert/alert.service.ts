import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async customAlert(header: string, message: string) {
    const errorAlert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await errorAlert.present();
  }

  async presentErrorAlert(msgContinue: string) {
    const errorAlert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error',
      message: 'An error occured while ' + msgContinue + ' Please try again!',
      buttons: ['OK']
    });
    await errorAlert.present();
  }

  async presentSuccessAlert(message: string) {
    const successAlert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Success',
      message: message,
      buttons: ['OK']
    });
    await successAlert.present();
  }

}
