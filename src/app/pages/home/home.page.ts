import { Component, OnInit } from '@angular/core';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from 'src/app/services/sql-queries/sql-queries.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User

  constructor(
    private sqlQueries: SqlQueriesService
  ) { }

  ngOnInit() {

  }

}
