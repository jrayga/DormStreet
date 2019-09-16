import { Component, OnInit } from '@angular/core';
import { Unit } from '../../../resources/models/unit';
import { AlertService } from '../../services/alert/alert.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImagePickerOptions } from '../../../resources/constants/image-picker-options';
import { SqlQueriesService } from 'src/app/services/sql-queries/sql-queries.service';
import { User } from '../../../resources/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGES } from '../../../resources/constants/pages';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.page.html',
  styleUrls: ['./update-property.page.scss'],
})
export class UpdatePropertyPage implements OnInit {
  unitForm: Unit
  images = []
  user: User
  unitId = ''
  isLoadingDetails = false

  constructor(
    private alertService: AlertService,
    private imagePicker: ImagePicker,
    private sqlQueries: SqlQueriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.unitId = this.activatedRoute.snapshot.params['propertyId'];
    this.getUnitDetails()
    this.setInitPage();
  }

  async setInitPage() {
    try {
      const readyPlatform = await this.platform.ready()
      document.addEventListener("backbutton", function (e) { console.log("disabled") }, false);
    } catch (error) {
      console.log("TCL: AddNewPropertyPage -> setInitPage -> error", error)
    }
  }

  async getUnitDetails() {
    try {
      this.isLoadingDetails = true
      const unit = await this.sqlQueries.getUnit(this.unitId);
      this.unitForm = await unit[0];
      this.images = await this.unitForm.unitPhotos;
      this.isLoadingDetails = false
      console.log("TCL: UpdatePropertyPage -> getUnitDetails -> this.unitForm", this.unitForm)
    } catch (error) {
      console.log("TCL: UpdatePropertyPage -> getUnitDetails -> error", error)
      this.alertService.presentErrorAlert('While getting the unit details.');
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

  async updateUnit() {
    if (this.unitForm.unitType == '' || this.unitForm.location == '' || this.unitForm.roomSize == ''
      || this.unitForm.unitTitle == '' || this.unitForm.unitDescription == '' || this.unitForm.numberOfRooms == null
      || this.unitForm.numberOfRooms == 0 || this.unitForm.priceOfRent == null || this.unitForm.priceOfRent == 0
      || this.unitForm.totalOccupancy == null || this.unitForm.unitPhotos.length == 0
    ) {
      this.alertService.customAlert('Warning', 'Please fill up all the forms. And please at least upload 1 or 2 images of the property.')
    } else {
      const updateDetailsStats = await this.sqlQueries.updateUnitDetails(this.unitForm)
      if (updateDetailsStats) {
        this.alertService.presentSuccessAlert("You're unit details has been succesfully updated!")
        this.router.navigate([PAGES.MYPROPERTIES])
      } else {
        this.alertService.presentErrorAlert('While updating unit details! Please try again.')
      }
    }
  }

  deleteUnit() { }

}
