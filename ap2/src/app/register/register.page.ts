import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private webService: WebService,
    private auth: AuthService,private router : Router,
    private alertCtrl: AlertController) { }

  credentials = {
    email: '',
    password: '',
    username: ''
  }

  ngOnInit() {
  }

  // function call auth service's register function
  // subcribes to result, which returns true or null
  register() {
    
    this.webService.postRegister(this.credentials).subscribe(async res => {
      if(res) {
        this.router.navigateByUrl('/');
      }
      else{
        const alert = this.alertCtrl.create({
          header: 'Registration Failed',
          message: 'Invalid or Missing Data.',
          buttons: ['OK']
        });
        await (await alert).present();
      }
    });
  } // register function closed

}
