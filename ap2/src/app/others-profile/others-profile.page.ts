import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility_funcs.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {
  constructor(
    private webService: WebService,
    private activeRoute: ActivatedRoute,
    private utils: UtilityService
  ) {}

  // array to hold profile data
  profileData: any = [];

  // array to hold user posts
  userPosts: any = [];

  ngOnInit() {
    this.getProfile();
  }

  // fetch user profile + posts
  loadProfile(username: any) {
    // call get user and set info. to profileData var
    this.webService.getUser(username).subscribe((profile) => {
      this.profileData = profile;

      // call get userposts + set to var
      this.webService.getUserPosts(profile['_id']).subscribe((res) => {
        this.userPosts = res;
      });
    });
  }

  // using query params to get the user's profile
  getProfile() {
    // fetch username from query param
    this.activeRoute.queryParams.subscribe((params) => {
      if (params && params.username) {
        this.loadProfile(JSON.parse(params.username));
      }
    });
  }
}
