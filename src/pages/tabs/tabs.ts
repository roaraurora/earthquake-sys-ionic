import { Component, ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';
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

  home = HomePage;

  constructor(private missionProvider: MissionProvider,
    private events: Events,
    private changeDetectorRef: ChangeDetectorRef) {
    this.homePage = {
      root: HomePage,
    };
    this.electricPage = {
      root: ElectricPage,
      param: { type: 'electric' },
    };
    this.firstaidPage = {
      root: ElectricPage,
      param: { type: 'firstaid' },
    };
    this.firefightingPage = {
      root: ElectricPage,
      param: { type: 'firefighting' },
    }
    this.getCount();
    console.warn("count: " + this.electricPage.count)
    this.events.subscribe('change', () => {
        this.getCount();
        // this.changeDetectorRef.detectChanges();
    })
  }
  getCount() {
    // 得到数字角标
    this.electricPage.count = this.missionProvider.countByType('electric');
    this.firstaidPage.count = this.missionProvider.countByType('firstaid');
    this.firefightingPage.count = this.missionProvider.countByType('firefighting')
  }
  ionViewWillUnload() {
    this.events.unsubscribe('change');
  }

}
