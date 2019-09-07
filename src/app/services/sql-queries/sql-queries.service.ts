import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { TABLES } from '../../../resources/constants/TABLES';
import { Storage } from '@ionic/storage';
import { AlertService } from '../alert/alert.service';
import { DATABASE } from '../../../resources/enums/database';
import { User } from '../../../resources/models/user';
import { Router } from '@angular/router';
import { PAGES } from 'src/resources/constants/pages';

@Injectable({
  providedIn: 'root'
})
export class SqlQueriesService {
  users = [{
    pk: 1,
    userType: 'Owner',
    userName: 'Owner01',
    email: 'owner01@yopmail.com',
    passWord: '123123',
    archived: false,
    postedUnits: []
  },
  {
    pk: 2,
    userType: 'User',
    userName: 'User01',
    email: 'user01@yopmail.com',
    passWord: '123123',
    archived: false
  }];

  constructor(
    private sqlite: SQLite,
    private storage: Storage,
    private alertService: AlertService,
    private router: Router
  ) { }


  getUser() {
    this.sqlite.create({
      name: DATABASE.MAINDB,
      location: DATABASE.DBLOCATION
    }).then((db: SQLiteObject) => {
      db.executeSql('select * from users', [])
        .then((t) => console.log(t))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  setUserAccounts() {
    this.storage.get(TABLES.users).then(async user => {
      if (user == null) {
        await this.storage.set('users', JSON.stringify(this.users));
      }
    }).catch(error => {
      console.log("TCL: AppComponent -> setUserAccounts -> error", error)
      this.alertService.presentErrorAlert('while adding storage users.')
    })
  }

  async addNewUser(userDetails) {
    this.storage.get(TABLES.users).then(async user => {
      let users = await JSON.parse(user)
      await users.push(userDetails)
      try {
        const addUser = await this.storage.set(TABLES.users, JSON.stringify(users));
        this.alertService.presentSuccessAlert('You are now successfully registered!')
        await this.router.navigate([PAGES.LOGIN]);
      } catch (error) {
        console.log("TCL: SqlQueriesService -> addNewUser -> error", error)
        this.alertService.presentErrorAlert('While registering your account.')
      }
    }).catch(error => {
      console.log("TCL: AppComponent -> setUserAccounts -> error", error)
      this.alertService.presentErrorAlert('while adding storage users.')
    })
  }
}
