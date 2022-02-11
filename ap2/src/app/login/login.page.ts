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
    email: 'test@email.com',
    pw: '123'
  }


  constructor(private auth: AuthService, private alertCtrl: AlertController,
    private router : Router) { }

  ngOnInit() {
  }


  login() {
    
    this.auth.login(this.credentials).subscribe(async res => {
      if(res) {
        this.router.navigateByUrl('/members');
      }
      else{
        const alert = this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Invalid Credentials.',
          buttons: ['OK']
        });
        await (await alert).present();
      }
    });
  }

}
