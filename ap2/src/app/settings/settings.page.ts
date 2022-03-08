import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {




  constructor(private auth : AuthService,
    private webService : WebService,
    private alertCtrl : AlertController) { }

  ngOnInit() {

  }

  logout(){
    this.auth.logout();
  }


  // confirm delete account pop up
  async presentDelete() {
    const alert = await this.alertCtrl.create({
      header : 'Confirm Delete',
      message : 'Are you sure you want to delete your account?',
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Yes',
          handler: () => {
            this.webService.deleteUser().subscribe();
            this.auth.logout();
          }
        }
      ]
    });
    alert.present();
  }


}
