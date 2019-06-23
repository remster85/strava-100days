import { SeriesZigzagOptions } from 'highcharts';
import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {pipe, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
 })
 
export class DataService {
 
constructor(private http: HttpClient) {}

  private data = [];
  
  getWeekDay(date){
    //Create an array containing each day, starting with Sunday.
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    //Use the getDay() method to get the day.
    var day = date.getDay();
    //Return the element that corresponds to that index.
    return weekdays[day];
}

  private getDay(dt : string) : string {
    var date = new Date(dt);
    return this.getWeekDay(date);
  }


  public getChartData() :  Array<number>{
    const self = this;

    this.http.get('http://localhost:7002')
        .subscribe((res:any) => 
        {
        
            let start_dates = res.map(x => this.getDay(x.start_date_local));

            console.log(start_dates);

            let mondays = start_dates.filter(x => x == "Monday").length;
            let tuesdays = start_dates.filter(x => x == "Tuesday").length;
            let wednesdays = start_dates.filter(x => x == "Wednesday").length;
            let thursdays = start_dates.filter(x => x == "Thursday").length;
            let fridays = start_dates.filter(x => x == "Friday").length;
            let saturdays = start_dates.filter(x => x == "Saturday").length;
            let sundays = start_dates.filter(x => x == "Sunday").length;

                self.data = [

                {name: 'Monday', y:mondays}, 
                {name: 'Tuesday', y:tuesdays},
                {name: 'Wednesday', y:wednesdays},
                {name: 'Thursday', y:thursdays},
                {name: 'Friday', y:fridays},
                {name: 'Saturday', y:saturdays},
                {name: 'Sunday', y:sundays}      
            ];

            return self.data;
        });

        return [0,0,0,0,0,0,0,0];
  }
}
