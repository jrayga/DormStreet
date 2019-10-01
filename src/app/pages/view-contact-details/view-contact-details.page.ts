import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SMSOptions } from '../../../resources/constants/sms-options';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-view-contact-details',
  templateUrl: './view-contact-details.page.html',
  styleUrls: ['./view-contact-details.page.scss'],
})
export class ViewContactDetailsPage implements OnInit {
  @Input() userName: string;
  @Input() contactNumber: string;

  constructor(
    private modalController: ModalController,
    private callNumber: CallNumber,
    private alertService: AlertService,
    private sms: SMS
  ) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async call() {
    try {
      const callNow = await this.callNumber.callNumber(this.contactNumber, true)
      console.log("TCL: ViewContactDetailsPage -> call -> callNow", callNow)
    } catch (error) {
      console.log("TCL: ViewContactDetailsPage -> call -> error", error)
      this.alertService.presentErrorAlert('While calling the owner. Please try again.')
    }
  }

  async text() {
    try {
      const textNow = await this.sms.send(this.contactNumber, '', SMSOptions)
      console.log("TCL: ViewContactDetailsPage -> text -> textNow", textNow)
    } catch (error) {
      console.log("TCL: ViewContactDetailsPage -> text -> error", error)
      this.alertService.presentErrorAlert('While texting the owner. Please try again.')
    }
  }

}
