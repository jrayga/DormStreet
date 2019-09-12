import { Component, OnInit } from '@angular/core';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { User } from '../../../resources/models/user';
import { USERTYPES } from '../../../resources/enums/userTypes';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PAGES } from '../../../resources/constants/pages';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  form = {
    pk: 0,
    userType: '',
    userName: '',
    passWord: '',
    email: '',
    contactNumber: '',
    postedUnits: []
  };

  passwordsForm = {
    currentPassword: '',
    pass1: '',
    pass2: ''
  }

  currentPass = ''
  userDetails: User

  constructor(
    private sqlQueries: SqlQueriesService,
    private alertService: AlertService,
    private menuController: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  async getUserProfile() {
    const user = await this.sqlQueries.getUser();
    if (user.userType == USERTYPES.NORMAL) {
      delete this.form.postedUnits
      this.form = user;
      this.currentPass = this.form.passWord
    } else {
      this.form = user;
      this.currentPass = this.form.passWord
    }
  }

  async updatePassword() {
    if (this.currentPass !== this.passwordsForm.currentPassword) {
      this.alertService.customAlert('Warning', 'Current password does not match! Please try again.')
    } else {
      if (this.passwordsForm.pass1 !== this.passwordsForm.pass2) {
        this.alertService.customAlert('Warning', 'New Password does not match! Please try again.')
      } else {
        this.form.passWord = this.passwordsForm.pass2
        const updatePassStats = await this.sqlQueries.updatePassword(this.form)
        if (updatePassStats) {
          this.alertService.presentSuccessAlert('Password succesfully updated! Please re-login your account using the new password.')
          this.logOut();
          this.resetForms();
        } else {
          this.alertService.presentErrorAlert('While updating your password! Please try again.')
        }
      }
    }
  }

  async updateDetails() {
    if (this.form.email == '' || this.form.userName == '' || this.form.contactNumber == '') {
      this.alertService.customAlert('Warning', 'Please fill up all the forms!')
    } else {
      const updateDetailsStats = await this.sqlQueries.updateDetails(this.form)
      if (updateDetailsStats) {
        this.alertService.presentSuccessAlert('You details have been succesfully updated!. Please re-login')
        this.logOut();
        this.resetForms();
      } else {
        this.alertService.presentErrorAlert('While updating your details! Please try again.')
      }
    }
  }

  resetForms() {
    this.passwordsForm = {
      currentPassword: '',
      pass1: '',
      pass2: ''
    }
  }

  async logOut() {
    const logOut = this.sqlQueries.logout();
    await this.menuController.enable(false)
    await this.router.navigate([PAGES.LOGIN])
  }

}
