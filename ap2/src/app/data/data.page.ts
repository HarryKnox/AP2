import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  
  // top toolbar tab selector
  toolbar_selection = "leaderboards";


  constructor(
    public datepipe : DatePipe
  ) { }

  ngOnInit() {
  }


  toolbar_update(event:any){
    this.toolbar_selection = event.target.value;
  }


}
