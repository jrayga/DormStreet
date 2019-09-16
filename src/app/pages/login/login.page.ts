import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { Storage } from '@ionic/storage';
import { PAGES } from '../../../resources/constants/pages';
import { TABLES } from '../../../resources/constants/TABLES';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { User } from '../../../resources/models/user';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form = {
    userName: '',
    passWord: ''
  }
  userExist = false

  constructor(
    private alertService: AlertService,
    private storage: Storage,
    private router: Router,
    private menuController: MenuController,
    private sqlQueries: SqlQueriesService,
    private platform: Platform
  ) { }


  resetForms() {
    this.form = {
      userName: '',
      passWord: ''
    }
  }

  ngOnInit() {
    this.resetForms();
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

  ngOnDestroy() {
    this.resetForms();
  }

  async login() {
    if (this.form.userName == '' || this.form.passWord == '') {
      this.alertService.customAlert('Warning', 'Please input your email or/and password!')
    } else {
      const loginStatus = await this.sqlQueries.login(this.form.userName, this.form.passWord)
      if (loginStatus) {
        await this.storage.set(TABLES.session, this.form.userName)
        await this.menuController.enable(true)
        await this.router.navigate([PAGES.DASHBOARD]);
        this.resetForms();
      } else {
        this.alertService.customAlert('Warning', 'Wrong username or/and password! Please try again.')
      }
    }
  }

  async goToRegister() {
    await this.router.navigate([PAGES.REGISTER]);
  }

}
