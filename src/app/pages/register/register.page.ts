import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../resources/models/user';
import { AlertService } from '../../services/alert/alert.service';
import { SqlQueriesService } from '../../services/sql-queries/sql-queries.service';
import { USERTYPES } from 'src/resources/enums/userTypes';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registrationForm = {
    pk: 0,
    userType: '',
    userName: '',
    passWord: '',
    email: '',
    contactNumber: '',
    postedUnits: []
  };

  passwordsForm = {
    pass1: '',
    pass2: ''
  }

  constructor(
    private alertService: AlertService,
    private sqlQueries: SqlQueriesService
  ) { }

  ngOnInit() {
    this.resetForms();
  }

  ngOnDestroy() {
    this.resetForms();
  }

  resetForms() {
    this.registrationForm = {
      pk: 0,
      userType: '',
      userName: '',
      passWord: '',
      email: '',
      contactNumber: '',
      postedUnits: []
    };
    this.passwordsForm = {
      pass1: '',
      pass2: ''
    }
  }

  async register() {
    if (this.registrationForm.userName == '' || this.registrationForm.email == '' || this.registrationForm.userType == '' || this.registrationForm.contactNumber == '') {
      this.alertService.customAlert('Warning', 'Please fill up all the forms')
    } else {
      if (this.passwordsForm.pass1 == this.passwordsForm.pass2) {
        this.registrationForm.pk = Math.floor((Math.random() * 1000) + 1);
        this.registrationForm.passWord = this.passwordsForm.pass2;
        if (this.registrationForm.userType == USERTYPES.NORMAL) {
          delete this.registrationForm.postedUnits;
        } else {
          this.registrationForm.postedUnits = []
        }
        this.sqlQueries.addNewUser(this.registrationForm)
      } else {
        this.alertService.customAlert('Warning', 'Passwords does not match! Please try again.')
      }
    }
  }

}
