import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  async presentLoading(message: string, duration: number) {
    const loading = await this.loadingController.create({
      message: message,
      duration: duration
    });
    await loading.present();
  }
}
