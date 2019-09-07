import { Component } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { Storage } from '@ionic/storage';
import { PAGES } from '../../../resources/constants/pages';
import { TABLES } from '../../../resources/constants/TABLES';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = {
    userName: '',
    passWord: ''
  }
  userExist = false

  constructor(
    private alertService: AlertService,
    private storage: Storage,
    private router: Router,
    private menuController: MenuController
  ) { }

  login() {
    if (this.form.userName == '' || this.form.passWord == '') {
      this.alertService.customAlert('Warning', 'Please input your email or/and password!')
    } else {
      this.storage.get(TABLES.users).then(async user => {
        const users = await JSON.parse(user);
        for (const i in users) {
          this.userExist = await this.form.userName == users[i].userName && this.form.passWord == users[i].passWord;
        }
        if (this.userExist) {
          await this.storage.set(TABLES.session, this.form.userName)
          await this.menuController.enable(true)
          await this.router.navigate([PAGES.DASHBOARD]);
        } else {
          this.alertService.customAlert('Warning', 'Wrong username or/and password! Please try again.')
        }
      }).catch(error => {
        console.log("TCL: LoginPage -> login -> error", error)
        this.alertService.presentErrorAlert('while logging in.')
      })
    }
  }

  async goToRegister() {
    await this.router.navigate([PAGES.REGISTER]);
  }

}
