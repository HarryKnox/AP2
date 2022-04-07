import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    pw: '',
  };

  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  // function call auth service's login function
  // subcribes to result, which return true or null
  login() {
    this.auth.login(this.credentials).subscribe(
      async (res) => {
        if (res) {
          this.router.navigateByUrl('/members');

          // reset form
          this.credentials = {
            email: '',
            pw: '',
          };
        }
      },
      // error catch
      async (error) => {
        // if email already taken, display error popup
        if (error.error['msg'].includes('incorrect')) {
          const alert = await this.alertCtrl
            .create({
              header: 'Login Failed',
              message:
                'You have entered an invalid username or password, please try again.',
              buttons: ['OK'],
            })
            .then((res) => res.present());
        } // if closed

        // clear login form
        this.credentials.pw = '';
      } // error catch closed
    );
  } // login function closed
} // loginPage class closed
