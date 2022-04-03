import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-search-user-modal',
  templateUrl: './search-user-modal.page.html',
  styleUrls: ['./search-user-modal.page.scss'],
})
export class SearchUserModalPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private webService: WebService,
    private router: Router
  ) {}

  // value to hold search box contents
  inputValue: any;

  // return value for search
  searchResults: any = [];

  // current user's profile
  current_user: any;

  ngOnInit() {
    // initial user data retrieved
    this.webService.getUser('current').subscribe((profile) => {
      this.current_user = profile;
    });
  }

  // dismiss the search modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // search bar function
  searchUser() {
    this.inputValue = (<HTMLInputElement>(
      document.getElementById('searchInput')
    )).value;

    // validation for at least one character
    if (this.inputValue != '') {
      this.searchResults = this.webService.getSearch(this.inputValue);

      if (this.searchResults == []) {
        this.searchResults = [];
      }
    } else {
      this.searchResults = [];
    }
  }

  // loads a user profile when name/profile pic clicked
  loadProfile(name: any) {
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
      this.dismissModal();
    }
  }
} // class closed
