import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private webService : WebService
  ) {}


  // var to hold logged-in User's data
  profileData : any = [];

  // life cycle hook called when component created
  ngOnInit() {
    
    this.webService.getUser().subscribe(
      (profile) => {
        console.log(profile)
        this.profileData = (profile)
      }
    );
   
  } // ngOnInit closed





} // class closed
