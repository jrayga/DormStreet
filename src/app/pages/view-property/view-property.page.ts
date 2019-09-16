import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { Unit } from '../../../resources/models/unit';
import { AlertService } from '../../services/alert/alert.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.page.html',
  styleUrls: ['./view-property.page.scss'],
})
export class ViewPropertyPage implements OnInit {
  isLoadingDetails = false;
  unitDetails: Unit
  unitId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private sqlQueries: SqlQueriesService,
    private alertService: AlertService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.unitId = this.activatedRoute.snapshot.params['propertyId'];
    this.getUnitDetails();
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
      this.unitDetails = await unit[0];
      console.log("TCL: ViewPropertyPage -> getUnitDetails -> this.unitDetails", this.unitDetails)
      this.isLoadingDetails = false;
    } catch (error) {
      console.log("TCL: ViewPropertyPage -> getUnitDetails -> error", error)
      this.alertService.presentErrorAlert('While getting the unit details.');
    }
  }

}
