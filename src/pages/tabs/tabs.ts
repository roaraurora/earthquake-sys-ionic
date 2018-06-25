import { Component } from '@angular/core';

import { ElectricPage } from '../electric/electric';
import { FirstaidPage } from '../first-aid/firstaid';
import { HomePage } from '../home/home';
import { FireFightingPage } from "../fire-fighting/fire-fighting";
import { MissionProvider } from "../../providers/mission/mission";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage: any;
  electricPage: any;
  firstaidPage: any;
  firefightingPage: any;

  home=HomePage;

  constructor(private missionProvider: MissionProvider) {
    this.homePage = {
      root: HomePage,
    };
    this.electricPage = {
      root: ElectricPage,
      param: { type: 'electric' },
      count: this.missionProvider.countByType('electric'),
    };
    this.firstaidPage = {
      root: FirstaidPage,
      param: { type: 'firstaid' },
      count: this.missionProvider.countByType('fisrtaid'),
    };
    this.firefightingPage = {
      root: FireFightingPage,
      param: 'firefighting',
      count: this.missionProvider.countByType('firefighting'),
    }
    console.error("count: "+this.electricPage.count)
  }
}
