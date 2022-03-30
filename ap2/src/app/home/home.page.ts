import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class homePage {
  constructor(
    public webService: WebService,
    private utils: UtilityService,
    private modalController: ModalController,
    private settingsPage: SettingsPage
  ) {}

  // array defined to hold all exercise posts
  post_list: any = [];

  // life cycle hook called when component created
  ngOnInit() {
    // fetches all exercise posts
    this.post_list = this.webService.getPosts();

    // initial user settings retrieved and set
    this.webService.getUser().subscribe((profile) => {
      this.webService.getUserSettings(profile['_id']).subscribe((res) => {
        this.settingsPage.settings.distance_unit = res['dist_unit'];
        this.settingsPage.settings.goal = res['goal_tracker'];
        this.settingsPage.settings.privacy = res['privacy'];

        this.settingsPage.changeDefaultMetric();
      });
    });
  } // ngOnInit closed

  // gets latest user info
  ionViewWillEnter() {
    this.post_list = this.webService.getPosts();

    // initial user settings retrieved and set
    this.webService.getUser().subscribe((profile) => {
      this.webService.getUserSettings(profile['_id']).subscribe((res) => {
        this.settingsPage.settings.distance_unit = res['dist_unit'];
        this.settingsPage.settings.goal = res['goal_tracker'];
        this.settingsPage.settings.privacy = res['privacy'];

        this.settingsPage.changeDefaultMetric();
      });
    });
  }
} // home page closed
