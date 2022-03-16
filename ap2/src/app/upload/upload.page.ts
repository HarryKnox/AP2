import { Component, OnInit } from '@angular/core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';

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
    userName: null,
  };

  constructor(private webService: WebService, private router: Router) {
    this.post_data.date = new Date();
  }

  ngOnInit() {
    // user data retrieved + username set
    this.webService.getUser().subscribe((res) => {
      this.post_data.userName = res['username'];
    });
  }

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
  submitUpload() {
    // selected icon set
    this.post_data.type = this.selected_icon;

    // exercise post, post call made
    this.webService.postExercise(this.post_data).subscribe((res) => {
      this.ngOnInit();
      this.resetFormModel();
      this.router.navigateByUrl('/members');
    });
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
      userName: null,
    };

    // exercise types icons border colour
    this.iconBorderColour1 = '0.01em solid black';
    this.iconBorderColour2 = '0.01em solid black';
    this.iconBorderColour3 = '0.01em solid black';
  }
}
