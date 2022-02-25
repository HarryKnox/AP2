import { Component, Input, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';

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

  // var t hold todays date
  today : any;


  // object to hold edit profile form credentials
  edit_info = {
    username : null,
    email : null,
    gender : null,
    dob : null,
    picture : null
  }


  constructor(
    private modalController : ModalController,
    private webService : WebService,
    private router : Router)
    { 


    this.today = new Date().toISOString;
  }

  ngOnInit() {

    this.edit_info = {
      username : this.username,
      email : this.email,
      gender : this.gender,
      dob : this.dob,
      picture : this.picture
    }
  } // ngOnInit closed

  // func to dismiss the edit profile modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // func to post edit profile API call
  editProfile() {

    // check if a new profile picture
    console.log("test",this.edit_info["picture"]);

    

    // calls register webservice API call
    this.webService.putUser(this.edit_info).subscribe(res => {
  
      if(res) {
        this.dismissModal();
        this.router.navigateByUrl('members')
      }
    }
    );
  }// edit profile closed


  onFileChange($event) {

    // get file object from visible file input
    let file = $event.target.files[0];
    this.edit_info.picture = file;
  }



  
} // edit-profile-modal class closed
