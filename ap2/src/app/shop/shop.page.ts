import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private webService: WebService
  ) {}

  // user account object. Required to get point balance
  user_points = 0;

  ngOnInit() {
    // retrieve user data and assing to var
    this.webService.getUser().subscribe((res) => {
      this.user_points = res['points'];
    });
  }

  // dismiss the help modal
  dismissModal() {
    this.modalController.dismiss();
  }
}
