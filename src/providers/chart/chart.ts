import { Injectable } from '@angular/core';
import { Chart } from './chart-object';
import { CHARTS } from './mock-charts';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  constructor() {
    console.log('Hello ChartProvider Provider');
  }

  getChart(type: string): Chart {
    if (type == 'pie') {
      let chart = CHARTS[0];
      return chart
    };
    if (type == 'line') {
      let chart = CHARTS[1];
      return chart;
    };
    if (type == 'bar') {
      let chart = CHARTS[2];
      return chart;
    };
  }
}
