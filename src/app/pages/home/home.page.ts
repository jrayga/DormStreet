import { Component, OnInit } from '@angular/core';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { Unit } from '../../../resources/models/unit';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User
  priceSort = false
  units: Unit[]

  isLoadingUnits = false;
  haveSelectedFilters = false
  isEmtpy = false

  filter = {
    location: '',
    unitType: '',
    price: '',
    numberOfRooms: 0
  }

  constructor(
    private sqlQueries: SqlQueriesService,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.getAllUnits();
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

  refreshItems(event) {
    this.getAllUnits();
    this.clearFilters();
    event.target.complete();
  }

  getAllUnits(price?: string, location?: string, unitType?: string, numberOfRooms?: number) {
    this.isLoadingUnits = true
    setTimeout(async () => {
      if (price != undefined || location != undefined || unitType != undefined || numberOfRooms != undefined) {
        if (unitType !== '') {
          this.haveSelectedFilters = true
        }
        if (location !== '') {
          this.haveSelectedFilters = true
        }
        if (numberOfRooms > 0) {
          this.haveSelectedFilters = true
        }
        if (price !== '') {
          this.haveSelectedFilters = true
        }
      }
      const units = await this.sqlQueries.getAllUnits(price, location, unitType, numberOfRooms)
      this.units = await units;
      this.isEmtpy = this.units.length == 0 ? true : false;
      this.isLoadingUnits = false
    }, 1500)
  }

  sortPrice() {
    this.priceSort = this.priceSort == true ? false : true;
    this.filter.price = this.priceSort == true ? 'desc' : 'asc';
    this.selectFilter('price');
  }

  async goToProperty(propertyId: number) {
    await this.router.navigate([`/view-property/${propertyId}`])
  }

  selectFilter(type: string) {
    this.getAllUnits(this.filter.price, this.filter.location, this.filter.unitType, this.filter.numberOfRooms)
  }

  async clearFilters() {
    this.priceSort = false
    this.haveSelectedFilters = false
    this.filter = {
      location: '',
      unitType: '',
      price: '',
      numberOfRooms: 0
    }
    this.getAllUnits(this.filter.price, this.filter.location, this.filter.unitType, this.filter.numberOfRooms)
  }

}
