import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TABLES } from 'src/resources/constants/TABLES';
import { AlertService } from './services/alert/alert.service';
import { Router } from '@angular/router';
import { PAGES } from 'src/resources/constants/pages';
import { SqlQueriesService } from './services/sql-queries/sql-queries.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading = false

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
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
      await this.platform.ready()
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
    } else {
      this.menuController.enable(false)
    }
    console.log("TCL: AppComponent -> getSession -> haveSession", haveSession)
  }

  async logOut() {
    await this.storage.remove(TABLES.session)
    await this.menuController.enable(false)
    await this.router.navigate([PAGES.LOGIN])
  }

}
