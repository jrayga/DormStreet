import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Unit } from 'src/resources/models/unit';
import { SqlQueriesService } from 'src/app/services/sql-queries/sql-queries.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage {
  @Input() unitForm: Unit;

  constructor(
    private modalController: ModalController,
    private sql: SqlQueriesService,
    private loadingController: LoadingController
  ) { }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async pay(selectedPayment: string) {
    this.dismissModal();
    const paymentLoading = await this.loadingController.create({
      message: `Paying with ${selectedPayment}. Please wait...`,
      duration: 3000
    });
    await paymentLoading.present();
    setTimeout(() => {
      this.sql.addNewUnit(this.unitForm)
    }, 3000)
  }

}
