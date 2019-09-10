import { Injectable, OnInit } from '@angular/core';
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
    userType: 'PropertyOwner',
    userName: 'Owner01',
    email: 'owner01@yopmail.com',
    passWord: '123123',
    archived: false,
    postedUnits: []
  },
  {
    pk: 2,
    userType: 'NormalUser',
    userName: 'User01',
    email: 'user01@yopmail.com',
    passWord: '123123',
    archived: false
  }];

  userDetails: User

  constructor(
    private sqlite: SQLite,
    private storage: Storage,
    private alertService: AlertService,
    private router: Router
  ) { }


  getUser() {
    return this.storage.get(TABLES.session).then(async userSession => {
      const session = await userSession;
      const users = await this.storage.get(TABLES.users)
      const usersParsed = JSON.parse(users);
      for (const i in usersParsed) {
        if (usersParsed[i].userName == session) {
          return await usersParsed[i];
        }
      }
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> getUser -> error", error)
      this.alertService.presentErrorAlert('while getting user details.')
    })
  }

  async setUserAccounts() {
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

  async updatePassword(userDetails) {
    return this.storage.get(TABLES.users).then(async users => {
      const usersIn = await JSON.parse(users);
      let passUpdated = false;
      for (const u in usersIn) {
        if (userDetails.pk == usersIn[u].pk) {
          usersIn[u].passWord = userDetails.passWord
          passUpdated = true;
          break;
        }
      }
      const updateUsers = await this.storage.set(TABLES.users, JSON.stringify(usersIn))
      return passUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while updating password.')
    })
  }

  async updateDetails(userDetails) {
    return this.storage.get(TABLES.users).then(async users => {
      const usersIn = await JSON.parse(users);
      let detailsUpdated = false;
      for (const u in usersIn) {
        if (userDetails.pk == usersIn[u].pk) {
          usersIn[u].email = userDetails.email
          detailsUpdated = true;
          break;
        }
      }
      const updateUsers = await this.storage.set(TABLES.users, JSON.stringify(usersIn))
      return detailsUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while updating password.')
    })
  }

  login(userName: string, passWord: string) {
    return this.storage.get(TABLES.users).then(async user => {
      const users = await JSON.parse(user);
      let userExist = false
      for (const u in users) {
        if (userName == users[u].userName && passWord == users[u].passWord) {
          userExist = true
          break;
        }
      }
      return userExist;
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while logging in.')
    })
  }

  async logout() {
    await this.storage.remove(TABLES.session)
  }
}
