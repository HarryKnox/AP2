import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal.page';
import { EditPostModalPage } from '../edit-post-modal/edit-post-modal.page';
import { UtilityService } from '../services/utility_funcs.service';
import { SearchUserModalPage } from '../search-user-modal/search-user-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private webService: WebService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private utils: UtilityService
  ) {}

  // used to force img refresh
  timeStamp = new Date().getTime();

  // var to hold logged-in user's data
  profileData: any = [];

  // array to hold logged- in user's posts
  userPosts: any = [];

  // life cycle hook called when component created
  ngOnInit() {
    this.getUserData();
  } // ngOnInit closed

  // gets latest user info
  ionViewWillEnter() {
    this.ngOnInit();
    this.getUserData();

    // reset time stamp - to refresh img
    this.timeStamp = new Date().getTime();
  }

  // display edit profilemodal
  async editProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalPage,

      // passing data to modal
      componentProps: {
        username: this.profileData.username,
        email: this.profileData.email,
        gender: this.profileData.gender,
        dob: this.profileData.dob,
        picture: this.profileData.picture,
      },
    });
    return await modal.present();
  } // present modal closed

  // display edit post modal
  async editPostModal(post: any) {
    const modal = await this.modalController.create({
      component: EditPostModalPage,

      // passing data to modal
      componentProps: {
        text: post.text,
        type: post.type,
        dist: this.utils.recalcDist(post.dist),
        time: this.utils.minutes2Time(post.time),
        unit: this.utils.distance_unit,
        id: post._id,
      },
    });
    return await modal.present();
  } // present modal closed

  // confirm delete post pop up
  async presentDelete(postID) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.webService.deletePost(postID).subscribe();
            this.getUserData();
          },
        },
      ],
    });
    alert.present();
  }

  // func to get user profile data
  getUserData() {
    // call get user and set info. to profileData var
    this.webService.getUser('current').subscribe((profile) => {
      this.profileData = profile;

      // call get userposts + set to var
      this.webService.getUserPosts(profile['_id']).subscribe((res) => {
        this.userPosts = res;
      });
    });
  } // func closed

  // display search modal
  async showSearchModal() {
    const modal = await this.modalController.create({
      component: SearchUserModalPage,
    });
    return await modal.present();
  } // present modal closed
} // class closed
