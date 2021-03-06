import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility_funcs.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.page.html',
  styleUrls: ['./edit-profile-modal.page.scss'],
})
export class EditProfileModalPage implements OnInit {
  // component props passed from profile.page.ts
  @Input() username;
  @Input() email;
  @Input() gender;
  @Input() dob;
  @Input() picture;

  // object to hold edit profile form credentials
  edit_info = {
    username: null,
    email: null,
    gender: null,
    dob: null,
    picture: null,
  };

  // used to force img refresh
  timeStamp = new Date().getTime();

  constructor(
    private modalController: ModalController,
    private webService: WebService,
    private router: Router,
    private alertCtrl: AlertController,
    private utils: UtilityService
  ) {}

  ngOnInit() {
    this.edit_info = {
      username: this.username,
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      picture: this.picture,
    };
  } // ngOnInit closed

  // gets latest user info
  ionViewWillEnter() {
    this.ngOnInit();

    // reset time stamp - to refresh img
    this.timeStamp = new Date().getTime();
  }
  // func to dismiss the edit profile modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // func to post edit profile API call
  async editProfile() {
    var overallValidator = true;

    // presence check performed
    if ((await this.utils.presenceCheck(this.edit_info)) == false) {
      overallValidator = false;
    }

    // presence check performed
    else if (this.utils.imageCheck(this.edit_info.picture) == false) {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Edit Failed',
          message: 'The file uploaded is not an image, please try again.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // presence check on inputs
    if (
      (await this.utils.presenceCheck(this.edit_info)) == true &&
      (await this.utils.imageCheck(this.edit_info.picture)) == true
    ) {
      // calls register webservice API call
      this.webService.putUser(this.edit_info).subscribe(
        (res) => {
          if (res) {
            this.dismissModal();
            this.router.navigateByUrl('members');
          }
        },

        // catch error
        async (error) => {
          // if new username already taken, display error popup
          if (error.error['msg'].includes('username')) {
            const alert = await this.alertCtrl
              .create({
                header: 'Registration Failed',
                message: 'An account already exists with this username.',
                buttons: ['OK'],
              })
              .then((res) => res.present());
          } // if closed
        } // error catch closed
      );
    } // if closed
  } // edit profile closed

  // called when file input changed by user
  onFileChange($event) {
    // get file object from visible file input and set to var
    let file = $event.target.files[0];
    this.edit_info.picture = file;
  }
} // edit-profile-modal class closed
