import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
    constructor(
        public datepipe : DatePipe
    ){}


    // var to hold default distance unit
    distance_unit = "Kilometres";
    distance_unit_short = "km";


    // function to convert minutes into HH:MM:SS
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

} // UtilityService class closed
