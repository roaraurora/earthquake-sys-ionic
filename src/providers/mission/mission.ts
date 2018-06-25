import { Injectable } from '@angular/core';
import { Mission } from './mission-object';
import { MISSIONS } from './mock-missions';

/*
  Generated class for the MissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MissionProvider {

  constructor() {
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
  setMission(mission: Mission) {
    MISSIONS.forEach(element => {
      if (element.id == mission.id) {
        element = mission;
      } else {
        MISSIONS.push(mission);
      }
    });
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
}
