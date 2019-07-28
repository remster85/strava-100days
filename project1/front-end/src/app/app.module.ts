import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ActivitiesHourHistogramComponent } from './my-charts/activities-hour-histogram/activities-hour-histogram.component';
import { ActivitiesPerWeekDayComponent } from './my-charts/activities-weekday-piechart/activities-weekday-piechart.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ActivitiesDetailsComponent } from './activities-details/activities-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ActivitiesPerWeekDayComponent,
    ActivitiesHourHistogramComponent,
    ChatbotComponent,
    ActivitiesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    HttpClientModule,
    ChartModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [ActivitiesDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
