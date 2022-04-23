import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private webService: WebService,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private utils: UtilityService
  ) {}

  // json object to hold register form credentials
  credentials = {
    username: null,
    email: null,
    password: null,
    cPassword: null,
  };

  ngOnInit() {}

  // function call auth service's register function
  // subcribes to result, which returns true or null
  async register() {
    var overallValidator = true;

    // presence check performed
    if ((await this.utils.presenceCheck(this.credentials)) == false) {
      overallValidator = false;
    }

    // password match check performed
    else if (this.credentials.password != this.credentials.cPassword) {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Registration Failed',
          message: 'Passwords do not match.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // email contains asperand check
    else if (!(this.credentials.email.indexOf('@') >= 0)) {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Registration Failed',
          message: 'Email address entered is not valid.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // password length check
    else if (this.credentials.password.length < 8) {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Registration Failed',
          message: 'Password must be at least 8 characters.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // if checks above pass, register user
    if (overallValidator == true) {
      // calls register webservice API call
      this.webService.postRegister(this.credentials).subscribe(
        async (res) => {
          if (res) {
            this.router.navigateByUrl('/');
          }
        },
        // catch error
        async (error) => {
          // if email already taken, display error popup
          if (error.error['msg'].includes('email')) {
            const alert = await this.alertCtrl
              .create({
                header: 'Registration Failed',
                message: 'An account already exists with this email address.',
                buttons: ['OK'],
              })
              .then((res) => res.present());
          } // if closed

          // if username already taken, display error popup
          else if (error.error['msg'].includes('username')) {
            const alert = await this.alertCtrl
              .create({
                header: 'Registration Failed',
                message:
                  'This username has already been taken, please try again.',
                buttons: ['OK'],
              })
              .then((res) => res.present());
          } // else if closed
        } // catch closed
      );
    } // if closed
  } // register function closed
}
