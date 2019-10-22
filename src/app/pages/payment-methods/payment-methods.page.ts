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
  totalAmountToPay = 250;
  totalMonths = 1;

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

  adjustPayment(method: string) {
    if (method === 'decrease' && this.totalMonths == 1) {
      this.totalMonths = 1;
      this.totalAmountToPay = this.totalMonths * 250;
    } else if (method === 'decrease' && this.totalMonths > 1) {
      this.totalMonths--;
      this.totalAmountToPay = this.totalMonths * 250;
    } else {
      this.totalMonths++;
      this.totalAmountToPay = this.totalMonths * 250;
    }
  }

  async pay(selectedPayment: string) {
    this.dismissModal();
    const paymentLoading = await this.loadingController.create({
      message: `Paying the amount of ${this.totalAmountToPay} using ${selectedPayment}. Please wait...`,
      duration: 3000
    });
    await paymentLoading.present();
    setTimeout(() => {
      this.sql.addNewUnit(this.unitForm)
    }, 3000)
  }

}
