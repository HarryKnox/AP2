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

  // json object to hold register form credentials
  credentials = {
    username : null,
    email : null,
    password : null,
    cPassword : null
  }

  ngOnInit() {
  }

  // function call auth service's register function
  // subcribes to result, which returns true or null
  async register() {

    var overallValidator = true;

    // presence check performed
    if (await this.presenceCheck() == false){
      overallValidator = false;
    }

    // password match check performed
    else if(this.credentials.password != this.credentials.cPassword){
      overallValidator = false;

      const alert = await this.alertCtrl.create({
        header: 'Registration Failed',
        message: 'Passwords do not match.',
        buttons: ['OK']
      }).then(res => res.present());
    }



    // if checks above pass, register user
    if(overallValidator == true){

      // calls register webservice API call
      this.webService.postRegister(this.credentials).subscribe(async res => {
        
        if(res) {
          this.router.navigateByUrl('/')
        }
      },
      // catch error
      async error => {

        // if email already taken, display error popup
        if((error.error["msg"]).includes("email")){
          const alert = await this.alertCtrl.create({
            header: 'Registration Failed',
            message: 'An account already exists with this email address.',
            buttons: ['OK']
          }).then(res => res.present());
        }// if closed

        // if username already taken, display error popup
        else if((error.error["msg"]).includes("username")){
          const alert = await this.alertCtrl.create({
            header: 'Registration Failed',
            message: 'This username has already been taken, please try again.',
            buttons: ['OK']
          }).then(res => res.present());
        }// else if closed

      } // catch closed
      
      );
    } // if closed




    

  } // register function closed


  // function to check credentials for values
  async presenceCheck(){
    var check = true;

    // loop through credentials and check if not null
    for(var cred in this.credentials){
      if (this.credentials[cred] == null){
        check = false;
      }
    }

    if (check == false) {
      const alert = await this.alertCtrl.create({
        header: 'Missing Fields',
        message: 'One or more of the required fields are empty, please try again.',
        buttons: ['OK']
      }).then(res => res.present());
    }

    return check;
  } // presence check func closed





}
