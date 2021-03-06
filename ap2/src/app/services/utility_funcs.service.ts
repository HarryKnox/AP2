import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(
    public datepipe: DatePipe,
    private alertCtrl: AlertController,
    private webService: WebService
  ) {}

  // var to hold default distance unit
  distance_unit = 'Kilometres';
  distance_unit_short = 'km';

  // var to hold default pace unit
  pace_unit = 'minutes/km';

  // function to convert minutes into HH:MM:SS
  minutes2Time(minutes: any) {
    // each time value taken from minutes
    var hours = Math.floor(minutes / 60);
    var mins = Math.floor(minutes % 60);
    var secs = Math.round((minutes - hours * 60 - mins) * 60);

    // array to hold values after validation checked
    var myArray = [];

    // validation for 1 character hour
    // NEEDED to prevent patch value error
    if (hours.toString().length == 1) {
      myArray.push('0' + hours.toString());
    } else {
      myArray.push(hours);
    }
    if (mins.toString().length == 1) {
      myArray.push('0' + mins.toString());
    } else {
      myArray.push(mins);
    }
    if (secs.toString().length == 1) {
      myArray.push('0' + secs.toString());
    } else {
      myArray.push(secs);
    }

    // correct time returned
    return myArray[0] + ':' + myArray[1] + ':' + myArray[2];
  } // mins2time func closed

  // function to change date to, "5 seconds ago"
  setDate(postDate: any) {
    var pipe_date = this.datepipe.transform(
      postDate,
      'yyyy-MM-ddTHH:mm:ss.SSS'
    );

    // adding an hour to offset a bug
    var fixed_date = moment(pipe_date).subtract(1, 'h').toDate();

    return moment(fixed_date).fromNow();
  }

  // function to re-calculate each posts distance, according to the set metric
  recalcDist(dist: any) {
    // if metric is kilometres, return distance as normal
    if (this.distance_unit == 'Kilometres') {
      return Math.round(dist * 100) / 100;
    }

    // if metric changed to miles, convert and return
    else {
      return Math.round(dist * 0.621371 * 100) / 100;
    }
  }

  // function to convert speed from km/m to miles/m
  recalcSpeed(speed: any) {
    // if metric is km/minute, return distance as normal
    if (this.pace_unit == 'minutes/km') {
      return speed;
    }

    // if metric changed to miles, convert and return
    else {
      return Math.round(speed * 1.60934 * 100) / 100;
    }
  }

  // rounds a number to nearest integer + returns
  roundNumber(num: any) {
    return Math.round(num);
  }

  // checks input for values
  async presenceCheck(input_data: any) {
    var check = true;

    // loop through credentials and check if not null
    for (var field in input_data) {
      if (
        input_data[field] == null ||
        input_data[field] == '' ||
        input_data[field] == ' '
      ) {
        check = false;
      }
    }

    if (check == false) {
      const alert = await this.alertCtrl
        .create({
          header: 'Missing Fields',
          message:
            'One or more of the required fields are empty, please try again.',
          buttons: ['OK'],
        })
        .then((res) => res.present());
    }

    return check;
  } // presence check func closed

  // checks for valid time
  timeCheck(input_time: any) {
    return moment(input_time, 'HH:mm:ss', true).isValid();
  }

  // checks for img in a file
  // code reference : https://stackoverflow.com/a/29806920
  imageCheck(file: any) {
    // check for no img uploaded - ALLOWED TO PASS
    if (file['type'] == undefined || file['type'] == null) {
      return true;
    }

    var fileType = file['type'];
    const imgTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

    if (imgTypes.includes(fileType)) {
      return true;
    } else {
      return false;
    }
  }
} // UtilityService class closed
