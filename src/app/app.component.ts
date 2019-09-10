import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TABLES } from '../resources/constants/TABLES';
import { AlertService } from './services/alert/alert.service';
import { Router } from '@angular/router';
import { PAGES } from '../resources/constants/pages';
import { SqlQueriesService } from './services/sql-queries/sql-queries.service';
import { User } from '../resources/models/user';
import { USERTYPES } from '../resources/enums/userTypes';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading = false
  isPropertyOwner = false
  userDetails: User

  public appPages = [
    {
      title: 'Dashboard',
      url: `/${PAGES.DASHBOARD}`,
      icon: 'home'
    },
    {
      title: 'Acount Details',
      url: `/${PAGES.ACCOUNTDETAILS}`,
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertService: AlertService,
    private menuController: MenuController,
    private router: Router,
    private sqlQueries: SqlQueriesService
  ) { }

  ngOnInit() {
    this.initializeApp();
    this.getSession();
    this.sqlQueries.setUserAccounts();
  }

  async initializeApp() {
    try {
      const platform = await this.platform.ready()
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    } catch (exemption) {
      console.log("TCL: AppComponent -> initializeApp -> exemption", exemption)
      this.alertService.presentErrorAlert('On initializeApp.')
    }
  }

  async getSession() {
    const haveSession = await this.storage.get(TABLES.session) !== null
    if (haveSession) {
      await this.router.navigate([PAGES.DASHBOARD])
      this.menuController.enable(true)
      this.getUserProfile()
    } else {
      this.menuController.enable(false)
    }
    console.log("TCL: AppComponent -> getSession -> haveSession", haveSession)
  }

  async getUserProfile() {
    this.sqlQueries.getUser().then(async user => {
      this.userDetails = await user;
      this.isPropertyOwner = this.userDetails.userType == USERTYPES.OWNER;
      console.log("TCL: AppComponent -> getUserProfile -> this.userDetails", this.userDetails)
    })
  }

  async logOut() {
    const logOut = this.sqlQueries.logout();
    await this.menuController.enable(false)
    await this.router.navigate([PAGES.LOGIN])
  }

}
