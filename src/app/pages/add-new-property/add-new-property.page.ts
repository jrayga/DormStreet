import { Component, OnInit } from '@angular/core';
import { Unit } from '../../../resources/models/unit';
import { AlertService } from '../../services/alert/alert.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImagePickerOptions } from '../../../resources/constants/image-picker-options';
import { SqlQueriesService } from 'src/app/services/sql-queries/sql-queries.service';
import { User } from '../../../resources/models/user';
import { Platform, ModalController } from '@ionic/angular';
import { PaymentMethodsPage } from '../payment-methods/payment-methods.page';

@Component({
  selector: 'app-add-new-property',
  templateUrl: './add-new-property.page.html',
  styleUrls: ['./add-new-property.page.scss'],
})
export class AddNewPropertyPage implements OnInit {
  unitForm = new Unit(0, '', '', '', 0, '', '', '', [], 0, 0, false)
  images = []
  user: User
  showUnitBtns = true;

  constructor(
    private alertService: AlertService,
    private imagePicker: ImagePicker,
    private sqlQueries: SqlQueriesService,
    private platform: Platform,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getOwnerDetails()
    this.setInitPage()
  }

  async setInitPage() {
    try {
      const readyPlatform = await this.platform.ready()
      document.addEventListener("backbutton", function (e) { console.log("disabled") }, false);
    } catch (error) {
      console.log("TCL: AddNewPropertyPage -> setInitPage -> error", error)
    }
  }

  async getOwnerDetails() {
    try {
      const userDetails = await this.sqlQueries.getUser()
      this.user = await userDetails;
      this.unitForm.unitId = this.user.pk.toString();
      this.unitForm.pk = Math.floor((Math.random() * 1000) + 1)
      console.log("TCL: AddNewPropertyPage -> getOwnerDetails -> this.unitForm", this.unitForm)
    } catch (error) {
      console.log("TCL: AddNewPropertyPage -> getOwnerDetails -> error", error)
      this.alertService.presentErrorAlert('while getting owner user details')
    }
  }

  getUnitImages() {
    this.imagePicker.getPictures(ImagePickerOptions).then(async selectedImages => {
      this.images = [];
      for (var i = 0; i < selectedImages.length; i++) {
        this.images.push('data:image/jpeg;base64,' + selectedImages[i]);
      }
      this.unitForm.unitPhotos = await this.images;
    }).catch(error => {
      console.log("TCL: AddNewPropertyPage -> getUnitImages -> error", error)
      this.alertService.presentErrorAlert('while getting the images for this unit')
    })
  }

  async addUnit() {
    if (this.unitForm.unitType == '' || this.unitForm.location == '' || this.unitForm.roomSize == ''
      || this.unitForm.unitTitle == '' || this.unitForm.unitDescription == '' || this.unitForm.numberOfRooms == null
      || this.unitForm.numberOfRooms == 0 || this.unitForm.priceOfRent == null || this.unitForm.priceOfRent == 0
      || this.unitForm.totalOccupancy == null || this.unitForm.unitPhotos.length == 0
    ) {
      this.alertService.customAlert('Warning', 'Please fill up all the forms. And please at least upload 1 or 2 images of the property.')
    } else {
      this.showUnitBtns = false;
      const paymentMethodModal = await this.modalController.create({
        component: PaymentMethodsPage,
        cssClass: 'paymentMethodsModal',
        componentProps: {
          'unitForm': this.unitForm
        }
      });
      await paymentMethodModal.present();
      const modalDismised = await paymentMethodModal.onDidDismiss();
      if (modalDismised.data.dismissed) {
        this.showUnitBtns = true;
      }
    }
  }
}
