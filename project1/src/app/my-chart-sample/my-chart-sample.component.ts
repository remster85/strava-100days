import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-my-chart-sample',
  templateUrl: './my-chart-sample.component.html',
  styleUrls: ['./my-chart-sample.component.css']
})


export class MyChartSampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per day of the week'
   },
   tooltip: {
      pointFormat: 'Number of runs on {point.name} : {point.y}'
  },
    series: [{
      data: [
         {name: 'Monday', y:1}, 
         {name: 'Tuesday', y:1},
         {name: 'Wednesday', y:1},
         {name: 'Thursday', y:1},
         {name: 'Friday', y:1},
         {name: 'Saturday', y:1},
         {name: 'Sunday', y:1}      
      ],
      type: 'pie'
    }]
  };

}
