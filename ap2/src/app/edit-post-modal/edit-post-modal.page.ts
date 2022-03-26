import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility_funcs.service';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.page.html',
  styleUrls: ['./edit-post-modal.page.scss'],
})
export class EditPostModalPage implements OnInit {
  // component props passed from profile.page.ts
  @Input() text;
  @Input() type;
  @Input() dist;
  @Input() time;
  @Input() unit;
  @Input() id;

  // object to hold edit profile form credentials
  edit_info = {
    text: null,
    type: null,
    dist: null,
    time: null,
    unit: null,
    date: null,
    id: null,
  };

  constructor(
    private modalController: ModalController,
    private webService: WebService,
    private router: Router,
    private alertCtrl: AlertController,
    private utils: UtilityService,
    private profilePage: ProfilePage
  ) {}

  ngOnInit() {
    this.edit_info = {
      text: this.text,
      type: this.type,
      dist: this.dist,
      time: this.time,
      unit: this.unit,
      date: new Date(),
      id: this.id,
    };
  } // ngOnInit closed

  // func to dismiss the edit profile modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // func to post edit profile API call
  editPost() {
    // calls register webservice API call
    this.webService
      .putPost(this.edit_info.id, this.edit_info)
      .subscribe((res) => {
        this.dismissModal();
        this.profilePage.ngOnInit();
        this.router.navigateByUrl('members');
      });
  } // edit profile closed

  // func to update <ion-select> value fields
  getSelectInput($event, field) {
    if (field == 'type') {
      this.edit_info.type = $event.target.value;
    } else {
      this.edit_info.unit = $event.target.value;
    }
  } // getSelectInput closed
} // edit-profile-modal class closed
