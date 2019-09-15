import { Component, OnInit } from '@angular/core';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { Unit } from '../../../resources/models/unit';
import { Router, ActivatedRoute } from '@angular/router';
import { PAGES } from '../../../resources/constants/pages';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.getUserProfile();
    })
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

}
