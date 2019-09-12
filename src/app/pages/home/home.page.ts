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

  constructor(
    private sqlQueries: SqlQueriesService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllUnits();
  }

  async getAllUnits() {
    this.isLoadingUnits = true
    const units = await this.sqlQueries.getAllUnits()
    this.units = await units;
    this.isLoadingUnits = false
    console.log("TCL: HomePage -> getAllUnits -> units", units)
  }

  sortPrice() {
    this.priceSort = this.priceSort == true ? false : true;
  }

  async goToProperty(propertyId: string) {
    await this.router.navigate([`/view-property/${propertyId}`])
  }

}
