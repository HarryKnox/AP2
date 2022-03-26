import { Component, OnInit } from '@angular/core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility_funcs.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  // sets running icon from fortawesome import
  runIcon = faRunning;

  // exercise types icons border colour
  iconBorderColour1 = '0.01em solid black';
  iconBorderColour2 = '0.01em solid black';
  iconBorderColour3 = '0.01em solid black';

  // var to hold the selected icon
  selected_icon = null;

  // object to hold exercise post data
  post_data = {
    type: null,
    text: null,
    dist: null,
    unit: null,
    time: null,
    date: null,
  };

  constructor(
    private webService: WebService,
    private router: Router,
    private alertCtrl: AlertController,
    private utils: UtilityService
  ) {
    this.post_data.date = new Date();
  }

  ngOnInit() {}

  // func to update border when exercise type is selected
  changeIconColour(num: any) {
    switch (num) {
      case 1:
        this.iconBorderColour1 = '0.05em solid green';
        this.iconBorderColour2 = '0.01em solid black';
        this.iconBorderColour3 = '0.01em solid black';
        this.selected_icon = 'walk';
        break;

      case 2:
        this.iconBorderColour2 = '0.05em solid green';
        this.iconBorderColour1 = '0.01em solid black';
        this.iconBorderColour3 = '0.01em solid black';
        this.selected_icon = 'cycle';
        break;

      case 3:
        this.iconBorderColour3 = '0.15em solid green';
        this.iconBorderColour1 = '0.01em solid black';
        this.iconBorderColour2 = '0.01em solid black';
        this.selected_icon = 'run';
        break;
    }
  } // change icon func closed

  // func to upload an exercise post to db
  async submitUpload() {
    // selected icon set
    this.post_data.type = this.selected_icon;

    var overallValidator = true;

    // presence check performed
    if ((await this.utils.presenceCheck(this.post_data)) == false) {
      overallValidator = false;
    }

    // check for zero or less dist
    else if (this.post_data.dist <= 0) {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Upload Failed',
          message: 'Distance must be greater than zero, please try again.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // check for time being zero
    else if (this.post_data.time == '00:00:00') {
      overallValidator = false;

      const alert = await this.alertCtrl
        .create({
          header: 'Upload Failed',
          message: 'Time must be longer than zero seconds, please try again.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    // if passes validation checks
    if (overallValidator == true) {
      // exercise post, post call made
      this.webService.postExercise(this.post_data).subscribe((res) => {
        this.ngOnInit();
        this.resetFormModel();
        this.router.navigateByUrl('/members');
      });
    }
  }

  // reset ngModel
  resetFormModel() {
    this.post_data = {
      type: null,
      text: null,
      dist: null,
      unit: null,
      time: null,
      date: null,
    };

    // exercise types icons border colour
    this.iconBorderColour1 = '0.01em solid black';
    this.iconBorderColour2 = '0.01em solid black';
    this.iconBorderColour3 = '0.01em solid black';
  }
} // class closed
