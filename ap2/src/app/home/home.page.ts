import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {

  constructor(
    public webService : WebService,
    private utils : UtilityService
  ) {}

  // array defined to hold all exercise posts
  post_list : any = [];  

  // life cycle hook called when component created
  ngOnInit(){

    // fetches all exercise posts
    this.post_list = this.webService.getPosts();


  }// ngOnInit closed

  // ionViewWillEnter(){
  //   // fetches all exercise posts
  //   console.log("Test")
  //   this.post_list = this.webService.getPosts();
    
  // }


} // home page closed
