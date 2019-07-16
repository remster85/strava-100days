import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-activities-hour-histogram',
  templateUrl: './activities-hour-histogram.component.html',
  styleUrls: ['./activities-hour-histogram.component.css']
})
export class ActivitiesHourHistogramComponent implements OnInit {



  activitiesUrl = "https://remstravaactivities.azurewebsites.net/api/ActivitiesFromStorage";

  isChartLoading = true;
  show = false;

  Highcharts2: typeof Highcharts = Highcharts;
  chartCallback;
  barChartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per hours'
   },
   tooltip: {
      pointFormat: 'Number of runs at {point.name} : {point.y}'
  },
  legend: {
    enabled: false
  }
  
  };

  constructor(private http: HttpClient) { 
   
  }

  
  ngOnInit() {

    this.barChartOptions.series = [
      {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: "column",
      }
    ];

    this.isChartLoading = true;
    this.http.get(this.activitiesUrl)
        .subscribe((res:any) => 
        {
          this.isChartLoading = false;   
          this.updateData(this.getPieChartData(res));
        });


  }

  getPieChartData(res:any){
    let start_hours = res.map(x => this.getHour(x.start_date_local));

    let hour00s = start_hours.filter(x => x == "00").length;
    let hour01s = start_hours.filter(x => x == "01").length;
    let hour02s = start_hours.filter(x => x == "02").length;
    let hour03s = start_hours.filter(x => x == "03").length;
    let hour04s = start_hours.filter(x => x == "04").length;
    let hour05s = start_hours.filter(x => x == "05").length;
    let hour06s = start_hours.filter(x => x == "06").length;

    let hour07s = start_hours.filter(x => x == "07").length;
    let hour08s = start_hours.filter(x => x == "08").length;
    let hour09s = start_hours.filter(x => x == "09").length;
    let hour10s = start_hours.filter(x => x == "10").length;
    let hour11s = start_hours.filter(x => x == "11").length;
    let hour12s = start_hours.filter(x => x == "12").length;
    let hour13s = start_hours.filter(x => x == "13").length;


    let hour14s = start_hours.filter(x => x == "14").length;
    let hour15s = start_hours.filter(x => x == "15").length;
    let hour16s = start_hours.filter(x => x == "16").length;
    let hour17s = start_hours.filter(x => x == "17").length;
    let hour18s = start_hours.filter(x => x == "18").length;
    let hour19s = start_hours.filter(x => x == "19").length;
    let hour20s = start_hours.filter(x => x == "20").length;

    let hour21s = start_hours.filter(x => x == "21").length;
    let hour22s = start_hours.filter(x => x == "22").length;
    let hour23s = start_hours.filter(x => x == "23").length;

    return [
      {name: '00', y:hour00s}, 
      {name: '01', y:hour01s},
      {name: '02', y:hour02s}, 
      {name: '03', y:hour03s},
      {name: '04', y:hour04s}, 
      {name: '05', y:hour05s},
      {name: '06', y:hour06s}, 
      {name: '07', y:hour07s},
      {name: '08', y:hour08s}, 
      {name: '09', y:hour09s},
      {name: '10', y:hour10s}, 
      {name: '11', y:hour11s},
      {name: '12', y:hour12s}, 
      {name: '13', y:hour13s},
      {name: '14', y:hour14s}, 
      {name: '15', y:hour15s},
      {name: '16', y:hour16s}, 
      {name: '17', y:hour17s},
      {name: '18', y:hour18s},
      {name: '19', y:hour19s}, 
      {name: '20', y:hour20s},
      {name: '21', y:hour21s}, 
      {name: '22', y:hour22s},      
      {name: '23', y:hour23s},   
    
    ]
 }

  private getHour(dt : string) : number {
    var hour = new Date(dt).getUTCHours();
    return hour;
  }

  updateData(data : any){  
    this.isChartLoading = false;
    this.Highcharts2.charts.forEach(element => {
      if(element != undefined){
        element.series[0].setData(data);
      }
    });
 }

}
