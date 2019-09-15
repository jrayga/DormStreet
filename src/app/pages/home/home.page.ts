import { Component, OnInit } from '@angular/core';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { Unit } from '../../../resources/models/unit';
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';

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
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllUnits();
  }

  async getAllUnits(price?: string, location?: string, unitType?: string, numberOfRooms?: number) {
    this.isLoadingUnits = true
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
