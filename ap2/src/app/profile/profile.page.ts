import { Component, OnInit, ɵgetSanitizationBypassType } from '@angular/core';
import { WebService } from '../services/web.service';
import { ModalController } from '@ionic/angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private webService : WebService,
    private modalController : ModalController
  ) {}


  // var to hold logged-in User's data
  profileData : any = [];

  // life cycle hook called when component created
  ngOnInit() {
    //this.webService.getUserPic("hello");
    // call get user and set info. to profileData var
    this.webService.getUser().subscribe(
      (profile) => {
        this.profileData = (profile);
      }
    );

  } // ngOnInit closed


  // display modal
  async presentModal() {

    const modal = await this.modalController.create({
      component: EditProfileModalPage,

      // passing data to modal
      componentProps: {
        username : this.profileData.username,
        email : this.profileData.email,
        gender : this.profileData.gender,
        dob : this.profileData.dob,
        picture : this.profileData.picture
      }
    });
    return await modal.present();

  }



} // class closed



