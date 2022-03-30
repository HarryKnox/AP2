import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WebService } from '../services/web.service';
import { UtilityService } from '../services/utility_funcs.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  // top toolbar tab selector
  toolbar_selection = 'leaderboards';

  // leaderboard time period filter selector
  leaderboard_time_filter = 'Weekly';

  // object to hold graph filters
  filters = {
    type: 'All Types',
    period: 'Weekly',
    lboard: 'Distance',
  };

  // var to hold all of user's stats
  user_stats: any = [];

  // var to hold the user's activity graph
  chart: any;

  // var to hold leaderboard data
  leaderboardData: any = [];

  constructor(
    public datepipe: DatePipe,
    private webService: WebService,
    private utils: UtilityService,
    private settingsPage: SettingsPage
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // gets all user stats from backend function call
    this.user_stats = this.webService
      .getUserStats(this.filters.period)
      .subscribe((stats: any) => {
        this.user_stats = stats;
      });

    // calls get leaderbaord function
    this.getLeaderboard();
  }

  // updates value of leaderboard or stats tab
  toolbar_update(event: any) {
    this.toolbar_selection = event.target.value;

    if (this.toolbar_selection == 'stats') {
      // get stats
      this.updateStats();
    }
  }

  // updates leaderboard, when filter changed
  leaderboard_update(event: any) {
    if (event != 'typeChange' && event != 'lboardChange') {
      this.leaderboard_time_filter = event.target.value;
    }
    // get leaderboard called
  }

  // func to update the stats object, when parameters changed
  updateStats() {
    // stats retrieved w/ new parameters
    this.user_stats = this.webService
      .getUserStats(this.filters.period)
      .subscribe((stats: any) => {
        this.user_stats = stats;
      });

    if (this.chart) {
      // old graph destroyed
      this.chart.destroy();
    }

    // new graph created
    this.getActivityGraph();
  }

  // function to generate an activity graph
  getActivityGraph() {
    // gets user's activity graph from backenbd
    this.webService
      .getActivityGraph(this.filters.period)
      .subscribe((graph: any) => {
        // keys and values seperated, to be x and y axises
        var graph_dates = Object.keys(graph);
        var graph_freq = Object.values(graph);

        // jsChart created
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: graph_dates,
            datasets: [
              {
                label: 'Exercise Frequency',
                data: graph_freq,
                borderWidth: 3,
                backgroundColor: 'rgba(93, 175, 89, 0.1)',
                borderColor: '#3e95cd',
              },
            ],
          },
        });
      }); // subscribe closed
  } // function closed

  // function to retrieve leaderboard data
  getLeaderboard() {
    // gets a leaderboard, using the var filters
    this.leaderboardData = this.webService.getLeaderboard(
      this.filters.lboard,
      this.filters.type,
      this.filters.period
    );
  }
}
