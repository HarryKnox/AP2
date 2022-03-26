import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EditPostModalPage } from '../edit-post-modal/edit-post-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class homePage {
  constructor(
    public webService: WebService,
    private utils: UtilityService,
    private modalController: ModalController
  ) {}

  // array defined to hold all exercise posts
  post_list: any = [];

  // life cycle hook called when component created
  ngOnInit() {
    // fetches all exercise posts
    this.post_list = this.webService.getPosts();
  } // ngOnInit closed
} // home page closed
