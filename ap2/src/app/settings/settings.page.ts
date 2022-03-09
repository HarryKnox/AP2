import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility_funcs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  distance_unit = this.utils.distance_unit;

  constructor(private auth : AuthService,
    private webService : WebService,
    private alertCtrl : AlertController,
    private utils : UtilityService) { }

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
  } // present delete modal closed


  // function to adjust the distance metric
  changeDefaultMetric(){
    this.utils.distance_unit = this.distance_unit;

    if(this.distance_unit == "Kilometres"){
        this.utils.distance_unit_short = "km";
    }
    else{
        this.utils.distance_unit_short = "Miles";
    }
    // RESTART ALL PAGES
}


}
