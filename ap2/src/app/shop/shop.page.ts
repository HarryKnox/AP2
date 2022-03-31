import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // dismiss the help modal
  dismissModal() {
    this.modalController.dismiss();
  }
}
