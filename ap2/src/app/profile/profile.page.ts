import { Component, OnInit, ɵgetSanitizationBypassType } from '@angular/core';
import { WebService } from '../services/web.service';
import { ModalController } from '@ionic/angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal.page';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private webService : WebService,
    private modalController : ModalController,
    public datepipe : DatePipe
  ) {}


  // var to hold logged-in user's data
  profileData : any = [];

  // array to hold logged- in user's posts
  userPosts : any = [];

  // life cycle hook called when component created
  ngOnInit() {
    
    // call get user and set info. to profileData var
    this.webService.getUser().subscribe(
      (profile) => {
        this.profileData = (profile);

        // call get userposts + set to var
        this.webService.getUserPosts(profile["username"]).subscribe(
          (res) => {
            this.userPosts = (res);
          }
        ); 
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

  } // present modal closed


    // function to put minutes into HH:MM:SS
    minutes2Time(minutes : any){

      // each time value taken from minutes
      var hours = Math.floor(minutes/60);
      var mins = Math.floor(minutes % 60);
      var secs = Math.round((minutes-(hours*60)-mins)*60)
      
      // array to hold values after validation checked
      var myArray = []
  
      // validation for 1 character hour
      // NEEDED to prevent patch value error
      if(hours.toString().length == 1){
        myArray.push("0"+hours.toString());
      }
      else{
        myArray.push(hours);
      }
      if(mins.toString().length == 1){
        myArray.push("0"+mins.toString());
      }
      else{
        myArray.push(mins);
      }
      if(secs.toString().length == 1){
        myArray.push("0"+secs.toString());
      }
      else{
        myArray.push(secs);
      }
  
      // correct time returned
      return(myArray[0]+":"+myArray[1]+":"+myArray[2]);
      
    } // mins2time func closed

    // function to change date to, "5 seconds ago"
    setDate(postDate:any){
      var fixed_date = this.datepipe.transform(postDate, 'yyyy-MM-ddTHH:mm:ss.SSS');
      fixed_date = moment(fixed_date).fromNow();
      return(fixed_date);
    }


} // class closed



