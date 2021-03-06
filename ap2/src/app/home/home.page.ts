import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';
import { AlertButton, AlertController, ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import {
  CircleProgressComponent,
  CircleProgressOptions,
} from 'ng-circle-progress';
import { ShopPage } from '../shop/shop.page';
import { NavigationExtras, Router } from '@angular/router';
import { OthersProfilePage } from '../others-profile/others-profile.page';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class homePage {
  constructor(
    public webService: WebService,
    private utils: UtilityService,
    private modalController: ModalController,
    private settingsPage: SettingsPage,
    private router: Router,
    private otherProfile: OthersProfilePage,
    private alertCtrl: AlertController
  ) {}

  // array defined to hold all exercise posts
  post_list: any = [];

  // goal tracker value
  goal_tracker_value = 0;

  // current user
  current_user: any;

  // boolean value for hiding/displaying comment box
  comment_box_boolean: boolean = false;

  // contains which particular post's comment box to open
  comment_box_to_show: null;

  // boolean value for hiding/displaying comment input
  comment_input_boolean: boolean = false;

  // contains which particular post's comment input to open
  comment_input_to_show: null;

  // holds value of the comment input
  comment_input_value: null;

  // holds comments for a post
  comments: any = [];

  // used to force img refresh
  timeStamp = new Date().getTime();

  // life cycle hook called when component created
  ngOnInit() {
    // fetches all exercise posts
    this.post_list = this.webService.getPosts();

    // initial user settings retrieved and set
    this.webService.getUser('current').subscribe((profile) => {
      this.current_user = profile;

      this.webService.getUserSettings(profile['_id']).subscribe((res) => {
        this.settingsPage.settings.distance_unit = res['dist_unit'];
        this.settingsPage.settings.goal = res['goal_tracker'];
        this.settingsPage.settings.privacy = res['privacy'];

        this.settingsPage.changeDefaultMetric();
      });
    });

    // fetches goal tracker value
    this.getGoalTrackerData();
  } // ngOnInit closed

  // gets latest user info
  ionViewWillEnter() {
    this.post_list = this.webService.getPosts();

    // initial user settings retrieved and set
    this.webService.getUser('current').subscribe((profile) => {
      this.webService.getUserSettings(profile['_id']).subscribe((res) => {
        this.settingsPage.settings.distance_unit = res['dist_unit'];
        this.settingsPage.settings.goal = res['goal_tracker'];
        this.settingsPage.settings.privacy = res['privacy'];

        this.settingsPage.changeDefaultMetric();
      });
    });

    // fetches goal tracker value
    this.getGoalTrackerData();

    // reset time stamp - to refresh img
    this.timeStamp = new Date().getTime();
  }

  // fetches user's time spent exercising this week
  getGoalTrackerData() {
    this.webService.getTrackerValue().subscribe((res) => {
      this.goal_tracker_value = Number(res);
    });
  }

  // display shop modal
  async showShopModal() {
    const modal = await this.modalController.create({
      component: ShopPage,
    });
    return await modal.present();
  } // present modal closed

  // loads a user profile when name/profile pic clicked
  loadProfile(name: any) {
    // check if commenter is set to private
    this.webService.getUser(name).subscribe((res) => {
      this.webService.getUserSettings(res['_id']).subscribe((res) => {
        // if public user
        if (res['privacy'] == 'public' || name == this.current_user.username) {
          // check if it is current user's profile
          if (name == this.current_user.username) {
            this.router.navigateByUrl('members/profile');
          } else {
            // adding username parameter to router navigation
            let navigationExtras: NavigationExtras = {
              queryParams: {
                username: JSON.stringify(name),
              },
            };

            // username is passed to loadProfile function of otherProfile component
            this.router.navigate(['members/others-profile'], navigationExtras);
          }
        } else {
          this.alertCtrl
            .create({
              header: 'Navigation Failed',
              message: "This user's profile is private.",
              buttons: ['OK'],
            })
            .then((res) => res.present());
        }
      });
    });
  }

  // opens comments section box
  openCommentBox(boxIndex, postID) {
    // load the comments for post
    this.webService.getComments(postID).subscribe((res) => {
      this.comments = res;

      // if already open, then close
      if (
        this.comment_box_to_show == boxIndex &&
        this.comment_box_boolean != false
      ) {
        this.comment_box_boolean = false;
      }

      // if not open, then open
      else {
        this.comment_box_boolean = true;
      }

      // update var for which comment box to open
      this.comment_box_to_show = boxIndex;
    });
  }

  // opens/closes comments section box
  openCommentInput(boxIndex) {
    if (
      this.comment_input_to_show == boxIndex &&
      this.comment_input_boolean != false
    ) {
      this.comment_input_boolean = false;
      this.comment_input_value = null;
    } else {
      this.comment_input_boolean = true;
      this.comment_input_value = null;
    }
    // update var for which comment input box to open
    this.comment_input_to_show = boxIndex;
  }

  // posts a comment to the DB
  async postComment(postID: any, posterName: any) {
    // presence check on input
    if (this.comment_input_value != ' ' && this.comment_input_value != null) {
      // create obj with comment data
      var commentData = {
        text: this.comment_input_value,
        postID: postID,
      };

      // call API route to post the comment
      this.webService.postComment(commentData).subscribe((res) => {
        // motivational pop up msg
        this.alertCtrl
          .create({
            header: 'Comment Posted Successfully',
            message: 'Thanks for supporting ' + posterName + '!',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());

        this.ngOnInit();
      });

      // reset comment value
      this.comment_input_value = null;

      // close comment input
      this.comment_input_boolean = false;
    }

    // if fail presence check
    else {
      await this.alertCtrl
        .create({
          header: 'Comment Failed',
          message: 'Required field is empty, please try again.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }
  } // post comment func closed

  // fetches comments for a post
  getComments(postID: any) {
    this.webService.getComments(postID).subscribe((res) => {
      return res;
    });
  }

  // confirm delete comment pop up
  async presentDelete(commentID: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete your comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.webService.deleteComment(commentID).subscribe();
            this.comment_box_boolean = false;
            this.ngOnInit();
          },
        },
      ],
    });
    alert.present();
  } // present delete modal closed

  // edit comment pop up
  async presentEditComment(commentID: any, commentText: any) {
    const editAlert = await this.alertCtrl.create({
      header: 'Edit Comment',
      cssClass: 'editAlert',
      inputs: [
        {
          name: 'comment',
          value: commentText,
          cssClass: 'editInput',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            // presence check on input
            if (data.comment != ' ' && data.comment != '') {
              this.webService.editComment(commentID, data.comment).subscribe();
              this.comment_box_boolean = false;
            }

            // if presence check fails
            else {
              this.alertCtrl
                .create({
                  header: 'Edit Failed',
                  message: 'Required field is empty, please try again.',
                  buttons: ['OK'],
                })
                .then((res) => res.present());
            }
          },
        },
      ],
    });
    editAlert.present();
  } // present delete modal closed

  // toggles the like for a post
  toggleLike(postID: any) {
    this.webService.putLike(this.current_user['_id'], postID);
    this.ngOnInit();
  }

  countLikes(post: any) {
    // if post has likes
    if (post.likes) {
      return post.likes.length;
    }

    // if post doesn't have likes
    else {
      return 0;
    }
  }

  // check if logged in user has liked post
  checkIfLiked(post: any) {
    for (var like in post.likes) {
      // check if liker is current user
      if (post.likes[like] == this.current_user['_id']) {
        return true;
      }
    }
    return false;
  }
} // home page closed
