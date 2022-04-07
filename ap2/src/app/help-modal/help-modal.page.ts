import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.page.html',
  styleUrls: ['./help-modal.page.scss'],
})
export class HelpModalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  @Input() section;

  // boolean values, displaying/hiding text blocks
  goal_tracker_boolean: boolean = false;
  points_boolean: boolean = false;
  privacy_boolean: boolean = false;
  shop_boolean: boolean = false;
  about_boolean: boolean = false;
  unit_boolean: boolean = false;

  ngOnInit() {
    // if help section passed open it
    if (this.section) {
      this.updateBoolean(this.section);
    }
  }

  // dismiss the help modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // updates boolean value, to display/hide text blocks
  updateBoolean(event: any) {
    // boolean var swaps for goal tracker text block
    if (event == 'goal') {
      if (this.goal_tracker_boolean == false) {
        this.goal_tracker_boolean = true;
      } else {
        this.goal_tracker_boolean = false;
      }
    }

    // boolean var swaps for points text block
    if (event == 'points') {
      if (this.points_boolean == false) {
        this.points_boolean = true;
      } else {
        this.points_boolean = false;
      }
    }

    // boolean var swaps for privacy text block
    if (event == 'privacy') {
      if (this.privacy_boolean == false) {
        this.privacy_boolean = true;
      } else {
        this.privacy_boolean = false;
      }
    }

    // boolean var swaps for shop text block
    if (event == 'shop') {
      if (this.shop_boolean == false) {
        this.shop_boolean = true;
      } else {
        this.shop_boolean = false;
      }
    }

    // boolean var swaps for about us text block
    if (event == 'about') {
      if (this.about_boolean == false) {
        this.about_boolean = true;
      } else {
        this.about_boolean = false;
      }
    }

    // boolean var swaps for distance unit text block
    if (event == 'unit') {
      if (this.unit_boolean == false) {
        this.unit_boolean = true;
      } else {
        this.unit_boolean = false;
      }
    }
  }
} // class closed
