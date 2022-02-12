import { Component } from '@angular/core';
import { WebService } from '../web.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  constructor(
    public webService : WebService,
    public datepipe : DatePipe,
  ) {}

  // array defined to hold all exercise posts
  post_list : any = [];  

  // life cycle hook called when component created
  ngOnInit(){

    // fetches all exercise posts
    this.post_list = this.webService.getPosts();


  }// ngOnInit closed


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
      
    } // func closed

    
    // function to change date to, "5 seconds ago"
    setDate(postDate:any){
      var fixed_date = this.datepipe.transform(postDate, 'yyyy-MM-ddTHH:mm:ss.SSS');
      fixed_date = moment(fixed_date).fromNow();
      return(fixed_date);
    }

}
