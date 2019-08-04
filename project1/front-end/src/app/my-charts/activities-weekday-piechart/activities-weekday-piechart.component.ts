import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-activities-weekday-piechart',
  templateUrl: './activities-weekday-piechart.component.html',
  styleUrls: ['./activities-weekday-piechart.component.css']
})


export class ActivitiesPerWeekDayComponent implements OnInit {

  isChartLoading : boolean = true;
  show : boolean  = false;
  data : any[];
  showActivitiesDetails : boolean = false;
  lastWeekDaySelected? : string;
  selectedWeekdayActivities: any[];

  Highcharts: typeof Highcharts = Highcharts;
  
  pieChartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per weekday'
   },
   tooltip: {
      pointFormat: 'Number of runs on {point.name} : {point.y}'
  },
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
        }
      }
    }
  };
  

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.pieChartOptions.series = [
      {
        cursor : 'pointer',
        data: [0,0,0,0,0,0,0],
        type: "pie",
        id : 'weekday',
        point:{
          events:{
            click: this.onClickChart.bind(this)
        }
      }          
      }
    ];

    this.isChartLoading = true;
    this.http.get(environment.activitiesUrl)
        .subscribe((res:any) => 
        {
          this.isChartLoading = false;
          this.data = this.enrichDataWithWeekday(res);   
          this.updateData(this.getPieChartData(this.data));
        });

     
   };

  onClickChart(event){

    if(this.lastWeekDaySelected == event.point.name && this.showActivitiesDetails || !this.showActivitiesDetails){  
          this.showActivitiesDetails = !this.showActivitiesDetails;
    }
   
    if(this.showActivitiesDetails){
      this.selectedWeekdayActivities = this.data.filter(x => x.weekday == event.point.name);
    }

    this.lastWeekDaySelected = event.point.name;

  }


  getDay(dt : string) : string {
    var date = new Date(dt);
    return this.getWeekDay(date);
  }

  getLocalTime(dt : string) : string {
    var dtRecalculated = new Date(dt);
    dtRecalculated.setHours(dtRecalculated.getHours() + 4);
    return dtRecalculated.toString();
  }
  
   enrichDataWithWeekday(res : any){
      res.map(x => x['weekday'] =  this.getDay(x.start_date_local));
      res.map(x => x['start_date_local'] =  this.getLocalTime(x.start_date_local));
      return res;
   }



   chartCallback(){
      Highcharts.charts.forEach(element => {
          console.log(element);
      });
   }

   getPieChartData(res:any){

    let mondays = res.filter(x => x.weekday == "Monday").length;
    let tuesdays = res.filter(x => x.weekday == "Tuesday").length;
    let wednesdays = res.filter(x => x.weekday == "Wednesday").length;
    let thursdays = res.filter(x => x.weekday == "Thursday").length;
    let fridays = res.filter(x => x.weekday == "Friday").length;
    let saturdays = res.filter(x => x.weekday == "Saturday").length;
    let sundays = res.filter(x => x.weekday == "Sunday").length;

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

