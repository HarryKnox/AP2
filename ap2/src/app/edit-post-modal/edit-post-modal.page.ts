import { Component, Input, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.page.html',
  styleUrls: ['./edit-post-modal.page.scss'],
})
export class EditPostModalPage implements OnInit {

  // component props passed from profile.page.ts
  @Input() id;
  @Input() username;
  @Input() text;
  @Input() type;
  @Input() dist;
  @Input() time;


  // object to hold post data
  edit_info = {
    username : null,
    text : null,
    type : null,
    dist : null,
    time : null
  }


  constructor(
    private modalController : ModalController,
    private webService : WebService,
    private router : Router,
    private alertCtrl : AlertController)
    { 

  }

  ngOnInit() {

    this.edit_info = {
      username : this.username,
      text : this.text,
      type : this.type,
      dist : this.dist,
      time : this.time
    }
  } // ngOnInit closed

  // func to dismiss the edit profile modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // func to post edit profile API call
  editPost() {
    console.log(this.edit_info);
  }




  
} // edit-profile-modal class closed
