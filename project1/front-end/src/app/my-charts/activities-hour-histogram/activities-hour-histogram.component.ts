import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-activities-hour-histogram',
  templateUrl: './activities-hour-histogram.component.html',
  styleUrls: ['./activities-hour-histogram.component.css']
})
export class ActivitiesHourHistogramComponent implements OnInit {

  isChartLoading = true;
  data : any[];
  show = false;
  showActivitiesDetails : boolean = false;
  selectedHourActivities: any[];

  Highcharts2: typeof Highcharts = Highcharts;
  chartCallback;
  barChartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per hour'
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
        cursor : "pointer",
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        type: "column",
        point: {
          events: {
            click: this.onPointSelect.bind(this),
          }
        }
      }
    ];

    this.isChartLoading = true;
    this.http.get(environment.activitiesUrl)
        .subscribe((res:any) => 
        {
          this.isChartLoading = false;   
          this.data = this.enrichDataWithHour(res); 
          this.updateData(this.getPieChartData(this.data));
        });


  }

  enrichDataWithHour(res : any){
    res.map(x => x['hour'] =  this.getHour(x.start_date_local));
    res.map(x => x['start_date_local'] =  this.getLocalTime(x.start_date_local));
    return res;
 }

  onPointSelect(event: any) { 
    this.showActivitiesDetails = !this.showActivitiesDetails;
    if(this.showActivitiesDetails){
      this.selectedHourActivities = this.data.filter(x => x.hour == event.point.category);
    }
  }

  getPieChartData(res:any){
  
    let hour00s = res.filter(x => x.hour == "00").length;
    let hour01s = res.filter(x => x.hour == "01").length;
    let hour02s = res.filter(x => x.hour == "02").length;
    let hour03s = res.filter(x => x.hour == "03").length;
    let hour04s = res.filter(x => x.hour == "04").length;
    let hour05s = res.filter(x => x.hour == "05").length;
    let hour06s = res.filter(x => x.hour == "06").length;

    let hour07s = res.filter(x => x.hour == "07").length;
    let hour08s = res.filter(x => x.hour == "08").length;
    let hour09s = res.filter(x => x.hour == "09").length;
    let hour10s = res.filter(x => x.hour == "10").length;
    let hour11s = res.filter(x => x.hour == "11").length;
    let hour12s = res.filter(x => x.hour == "12").length;
    let hour13s = res.filter(x => x.hour == "13").length;


    let hour14s = res.filter(x => x.hour == "14").length;
    let hour15s = res.filter(x => x.hour == "15").length;
    let hour16s = res.filter(x => x.hour == "16").length;
    let hour17s = res.filter(x => x.hour == "17").length;
    let hour18s = res.filter(x => x.hour == "18").length;
    let hour19s = res.filter(x => x.hour == "19").length;
    let hour20s = res.filter(x => x.hour == "20").length;

    let hour21s = res.filter(x => x.hour == "21").length;
    let hour22s = res.filter(x => x.hour == "22").length;
    let hour23s = res.filter(x => x.hour == "23").length;

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

  getHour(dt : string) : number {
    var hour = new Date(dt).getUTCHours();
    return hour;
  }

  getLocalTime(dt : string) : string {
    var dtRecalculated = new Date(dt);
    dtRecalculated.setHours(dtRecalculated.getHours() + 4);
    return dtRecalculated.toString();
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
