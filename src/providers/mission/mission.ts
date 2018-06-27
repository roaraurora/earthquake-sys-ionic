import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Mission } from './mission-object';
import { MISSIONS } from './mock-missions';

/*
  Generated class for the MissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MissionProvider {

  constructor(private events: Events) {
    console.log('Hello MissionProvider Provider');
  }
  getMissionsByType(type: string): Array<Mission> {
    let missionByType: Mission[] = new Array();
    MISSIONS.forEach(element => {
      if (element.type == type) {
        missionByType.push(element);
      }
    });
    return missionByType;
  }
  getMissionByid(id: number): Mission {
    let mission = new Mission(MISSIONS.length + 1000,//should be manage by db
      null,
      { lat: -33.8688, lng: 151.2093 },//should be gernerate by native service
      null,
      null,
      new Date().toISOString(),
      false,
      "/assets/imgs/view.jpg",//should be null and allow user shot for photo
      null);
    MISSIONS.forEach(element => {
      if (element.id == id) {
        console.warn("get mission by id :" + id + typeof (id))
        mission = element;
      }
    })
    return mission;
  }
  setMission(mission: Mission):number{
    MISSIONS.forEach(element => {
      if (element.id == mission.id) {
        element = mission;
        return 1;
      }
    });
    MISSIONS.push(mission);
    this.pubMissionChange();//add
    return 2;
  }
  countByType(type: string): number {
    let count = 0;
    MISSIONS.forEach(element => {
      if (element.type == type) {
        count += 1;
      }
    });
    return count
  }
  pubMissionChange(){
    this.events.publish('change')
  }
}
