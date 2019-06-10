import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from "./../data.service";

@Component({
  selector: 'app-my-chart-sample',
  templateUrl: './my-chart-sample.component.html',
  styleUrls: ['./my-chart-sample.component.css']
})


export class MyChartSampleComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chart;
  chartCallback;
  chartOptions: Highcharts.Options = {
   title: {
      text: 'Number of runs per day of the week'
   },
   tooltip: {
      pointFormat: 'Number of runs on {point.name} : {point.y}'
  },
  };

  constructor(private dataService: DataService) { 
      const self = this;
      this.chartCallback = chart => {
         self.chart = chart;
      };
  }

  updateData(data : Array<number>){

   this.chartOptions.series = [
      {
        data: data,
        type: "pie",
      }
    ];
 }

  ngOnInit() {
     this.updateData(this.dataService.getChartData());
   };
 }

