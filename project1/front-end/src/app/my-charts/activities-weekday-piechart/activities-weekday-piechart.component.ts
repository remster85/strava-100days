import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-activities-weekday-piechart',
  templateUrl: './activities-weekday-piechart.component.html',
  styleUrls: ['./activities-weekday-piechart.component.css']
})


export class ActivitiesPerWeekDayComponent implements OnInit {

  activitiesUrl = "https://remstravaactivities.azurewebsites.net/api/ActivitiesFromStorage";

  isChartLoading = true;
  show = false;

  Highcharts: typeof Highcharts = Highcharts;
  
  pieChartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per weekday'
   },
   tooltip: {
      pointFormat: 'Number of runs on {point.name} : {point.y}'
  },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.pieChartOptions.series = [
      {
        data: [0,0,0,0,0,0,0],
        type: "pie",
        id : 'weekday'
      }
    ];

    this.isChartLoading = true;
    this.http.get(this.activitiesUrl)
        .subscribe((res:any) => 
        {
          this.isChartLoading = false;   
          this.updateData(this.getPieChartData(res));
        });

     
   };

   chartCallback(){
      console.log('chart called back');
      Highcharts.charts.forEach(element => {
          console.log(element);
      });
   }

   getPieChartData(res:any){
    let start_dates = res.map(x => this.getDay(x.start_date_local));

    let mondays = start_dates.filter(x => x == "Monday").length;
    let tuesdays = start_dates.filter(x => x == "Tuesday").length;
    let wednesdays = start_dates.filter(x => x == "Wednesday").length;
    let thursdays = start_dates.filter(x => x == "Thursday").length;
    let fridays = start_dates.filter(x => x == "Friday").length;
    let saturdays = start_dates.filter(x => x == "Saturday").length;
    let sundays = start_dates.filter(x => x == "Sunday").length;

    return [

      {name: 'Monday', y:mondays}, 
      {name: 'Tuesday', y:tuesdays},
      {name: 'Wednesday', y:wednesdays},
      {name: 'Thursday', y:thursdays},
      {name: 'Friday', y:fridays},
      {name: 'Saturday', y:saturdays},
      {name: 'Sunday', y:sundays}      
    ]
 }

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

   updateData(data : any){  
      this.isChartLoading = false;
      //get first chart defined
      Highcharts.charts.forEach(element => {
        if(element != undefined){
          element.series[0].setData(data);
        }
      });      
   }

 }

