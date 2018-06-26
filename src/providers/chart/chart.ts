import { Injectable } from '@angular/core';
import { Chart } from './chart-object';
import { CHARTS } from './mock-charts';
import { MissionProvider } from "../../providers/mission/mission";

@Injectable()
export class ChartProvider {

  constructor(private missionProvider: MissionProvider) {
    console.log('Hello ChartProvider Provider');
  }

  getChart(type: string): Chart {
    if (type == 'pie') {
      let chart = {
        type: 'pie',
        legend: {
          bottom: 10,
          left: 'center',
          data: ['electric', 'firefighting', 'firstaid']
        },
        option: {
          series: {
            type: 'pie',
            data: [{
              name: 'electric', value: this.missionProvider.countByType('electric')
            }, {
              name: 'firstaid', value: this.missionProvider.countByType('firstaid')
            }, {
              name: 'firefighting', value: this.missionProvider.countByType('firefighting')
            }]
          }
        },
        
        isShow: true,
        EChart: null
      };
      return chart
    };
    if (type == 'line') {
      let chart = CHARTS[0];
      return chart;
    };
    if (type == 'bar') {
      let chart = CHARTS[1];
      return chart;
    };
  }
}
