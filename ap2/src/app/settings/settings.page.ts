import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility_funcs.service';
import { relativeTimeThreshold } from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  // obj holding settings
  settings = {
    distance_unit: null,
    privacy: null,
    goal: null,
  };

  constructor(
    private auth: AuthService,
    private webService: WebService,
    private alertCtrl: AlertController,
    private utils: UtilityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setSettings();
  }

  // logs a user out
  logout() {
    this.auth.logout();
  }

  // confirm delete account pop up
  async presentDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.webService.deleteUser().subscribe();
            this.auth.logout();
          },
        },
      ],
    });
    alert.present();
  } // present delete modal closed

  // adjusts the distance metric
  changeDefaultMetric() {
    this.utils.distance_unit = this.settings.distance_unit;

    if (this.settings.distance_unit == 'Kilometres') {
      this.utils.distance_unit_short = 'km';
      this.utils.pace_unit = 'minutes/km';
    } else {
      this.utils.distance_unit_short = 'Miles';
      this.utils.pace_unit = 'minutes/mile';
    }
  }

  // sets the user settings, from saved DB settings
  setSettings() {
    this.webService.getUser().subscribe((profile) => {
      this.webService.getUserSettings(profile['_id']).subscribe((res) => {
        this.settings.distance_unit = res['dist_unit'];
        this.settings.goal = res['goal_tracker'];
        this.settings.privacy = res['privacy'];

        this.changeDefaultMetric();
      });
    });
  }

  // saves the user's settings to DB
  saveSettings() {
    this.webService.postUserSettings(this.settings).subscribe();
    this.router.navigateByUrl('members');
  }
} // class closed
