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
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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

  intevalCounter = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertService: AlertService,
    private menuController: MenuController,
    private router: Router,
    private sqlQueries: SqlQueriesService,
    private imagePicker: ImagePicker,
    private sms: SMS,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.initializeApp();
    this.getSession();
    this.sqlQueries.setUserAccounts();
    this.sqlQueries.setUnits();
    this.userRoleChecker()
  }

  userRoleChecker() {
    setInterval(() => {
      if (this.intevalCounter < 5) {
        this.intevalCounter++;
        this.getUserProfile()
        if (this.userDetails !== undefined) {
          this.isPropertyOwner = this.userDetails.userType == USERTYPES.OWNER ? true : false;
        }
      } else {
        this.intevalCounter = 0;
      }
    }, 1000)
  }

  async initializeApp() {
    try {
      const platform = await this.platform.ready()
      document.addEventListener("backbutton", function (e) { console.log("disabled") }, false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deviceRequestForPlugins();
    } catch (exemption) {
      console.log("TCL: AppComponent -> initializeApp -> exemption", exemption)
      this.alertService.presentErrorAlert('Error on initializeApp.')
    }
  }

  async deviceRequestForPlugins() {
    try {
      const hasPermissionImage = await this.imagePicker.hasReadPermission()
      const hasPermissionSMS = await this.sms.hasPermission()
      const hasPermissionCall = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CALL_PHONE).then(async hasPermission => {
        return hasPermission.hasPermission;
      })
      if (!hasPermissionImage) {
        await this.imagePicker.requestReadPermission();
      }
      if (!hasPermissionSMS) {
        await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      }
      if (!hasPermissionCall) {
        await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CALL_PHONE)
      }
    } catch (error) {
      console.log("TCL: AppComponent -> deviceRequestForPlugins -> error", error)
      // this.alertService.presentErrorAlert(error) // TODO: Show error.
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
  }

  async getUserProfile() {
    try {
      const user = await this.sqlQueries.getUser();
      this.userDetails = await user;
    } catch (error) {
      console.log("TCL: AppComponent -> getUserProfile -> error", error)
    }
  }

  async logOut() {
    const logOut = this.sqlQueries.logout();
    await this.menuController.enable(false)
    await this.router.navigate([PAGES.LOGIN])
  }

}
