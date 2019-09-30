import { Component, OnInit } from '@angular/core';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { Unit } from '../../../resources/models/unit';
import { Router, ActivatedRoute } from '@angular/router';
import { PAGES } from '../../../resources/constants/pages';
import { Platform, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.page.html',
  styleUrls: ['./my-properties.page.scss'],
})
export class MyPropertiesPage implements OnInit {
  userDetails: User
  isLoadingUnits = false
  units: Unit[]
  haveSelectedFilters = false
  isEmtpy = false

  constructor(
    private sqlQueries: SqlQueriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private alertController: AlertController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.getUserProfile();
    })
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

  async getUserProfile() {
    try {
      const user = await this.sqlQueries.getUser();
      this.userDetails = await user;
      this.getUserUnits();
      console.log("TCL: MyPropertiesPage -> getUserProfile -> this.userDetails", this.userDetails)
    } catch (error) {
      console.log("TCL: AppComponent -> getUserProfile -> error", error)
    }
  }

  async getUserUnits() {
    try {
      this.isLoadingUnits = true
      const units = await this.sqlQueries.getUserUnits(this.userDetails.postedUnits)
      this.units = await units
      this.isEmtpy = this.units.length == 0 ? true : false;
      this.isLoadingUnits = false
    } catch (error) {
      console.log("TCL: MyPropertiesPage -> getUserUnits -> error", error)
    }
  }

  async gotoAddNewUnitPage() {
    await this.router.navigate([PAGES.ADDNEWPROPERTY]);
  }

  async goToProperty(unitId: string) {
    await this.router.navigate([`update-property/${unitId}`])
  }

  async deleteProperty(unitId: string) {
    const deletePropertyAlert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want delete this property posting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Yes',
          handler: async () => {
            const deletePropery = await this.sqlQueries.deleteUnitPosting(unitId);
            if (deletePropery) {
              await this.getUserProfile();
              this.alertService.presentSuccessAlert("Unit post has been successfully deleted.")
            } else {
              this.alertService.presentErrorAlert('While deleting the unit! Please try again.')
            }
          }
        }
      ]
    });
    await deletePropertyAlert.present();
  }

}
