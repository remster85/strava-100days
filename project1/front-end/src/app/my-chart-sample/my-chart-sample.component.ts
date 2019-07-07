import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClientModule, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-chart-sample',
  templateUrl: './my-chart-sample.component.html',
  styleUrls: ['./my-chart-sample.component.css']
})


export class MyChartSampleComponent implements OnInit {
  isChartLoading = true;
  show = false;

  Highcharts: typeof Highcharts = Highcharts;
  chartCallback;
  chartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per day of the week'
   },
   tooltip: {
      pointFormat: 'Number of runs on {point.name} : {point.y}'
  },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.chartOptions.series = [
      {
        data: [0,0,0,0,0,0,0],
        type: "pie",
      }
    ];

    this.isChartLoading = true;
    //https://stravaactivities.azurewebsites.net/api/ActivitiesSample
    this.http.get('https://remstravaactivities.azurewebsites.net/api/ActivitiesFromStorage')
        .subscribe((res:any) => 
        {
        
            let start_dates = res.map(x => this.getDay(x.start_date_local));

            let mondays = start_dates.filter(x => x == "Monday").length;
            let tuesdays = start_dates.filter(x => x == "Tuesday").length;
            let wednesdays = start_dates.filter(x => x == "Wednesday").length;
            let thursdays = start_dates.filter(x => x == "Thursday").length;
            let fridays = start_dates.filter(x => x == "Friday").length;
            let saturdays = start_dates.filter(x => x == "Saturday").length;
            let sundays = start_dates.filter(x => x == "Sunday").length;

            this.isChartLoading = false;
            this.updateData([

              {name: 'Monday', y:mondays}, 
              {name: 'Tuesday', y:tuesdays},
              {name: 'Wednesday', y:wednesdays},
              {name: 'Thursday', y:thursdays},
              {name: 'Friday', y:fridays},
              {name: 'Saturday', y:saturdays},
              {name: 'Sunday', y:sundays}      
          ]);

         
        });

     
   };

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
      Highcharts.charts[0].series[0].setData(data);
   }

   updateChartWithFakeData(){
    Highcharts.charts[0].series[0].setData([1,2,3,4,5,6,7]);
   }

   updateChartWithStaticApi(){

    this.isChartLoading = true;


     this.http.get('https://remstravaactivities.azurewebsites.net/api/ActivitiesFromStorage')
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

         
            this.isChartLoading = false;
            
            this.updateData([

              {name: 'Monday', y:mondays}, 
              {name: 'Tuesday', y:tuesdays},
              {name: 'Wednesday', y:wednesdays},
              {name: 'Thursday', y:thursdays},
              {name: 'Friday', y:fridays},
              {name: 'Saturday', y:saturdays},
              {name: 'Sunday', y:sundays}      
          ]);
        
        });
   }
 }

