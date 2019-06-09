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
    series: [{
      data: [1, 2, 3, 6],
      type: 'line'
    }]
  };

}
