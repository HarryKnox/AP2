import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  
  // top toolbar tab selector
  toolbar_selection = "leaderboards";

  // object to hold graph filters
  filters = {
    type : "All Types",
    period : "Weekly"
  }

  // var to hold all of user's stats
  user_stats : any = [];

  // var to hold the user's activity graph
  chart : any;

  constructor(
    public datepipe : DatePipe,
    private webService : WebService,
    private utils : UtilityService
  ) { Chart.register(...registerables) }

  ngOnInit() {

    // gets all user stats from backend function call
    this.user_stats = this.webService.getUserStats(this.filters.period).subscribe(
      (stats:any) =>{
        this.user_stats=stats;
      }
    );

    // activity graph function called
    this.getActivityGraph();

  }

  // func to update value of leaderboard or stats tab
  toolbar_update(event:any){
    this.toolbar_selection = event.target.value;
  }


  // func to update the stats object, when parameters changed
  updateStats(){

    // stats retrieved w/ new parameters
    this.user_stats = this.webService.getUserStats(this.filters.period).subscribe(
      (stats:any) =>{
        this.user_stats=stats;
      }
    );
  }


  // function to generate an activity graph
  getActivityGraph(){
    // gets user's activity graph from backenbd
    this.webService.getActivityGraph(this.filters.period).subscribe(
      (graph:any) =>{

        // keys and values seperated, to be x and y axises
        var graph_dates = Object.keys(graph);
        var graph_freq = Object.values(graph);
        
        // jsChart created
        this.chart = new Chart('canvas', {
          type : 'line',
          data : {
            labels : graph_dates,
            datasets : [
              {
                label : 'Exercise Frequency',
                data : graph_freq,
                borderWidth : 3,
                backgroundColor : 'rgba(93, 175, 89, 0.1)',
                borderColor : '#3e95cd'
              },
            ]},
        })
      }
    ); // subscribe closed
  } // function closed


}
