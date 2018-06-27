import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Mission } from '../../providers/mission/mission-object';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MissionProvider } from "../../providers/mission/mission";


@IonicPage()
@Component({
  selector: 'page-mission-detail',
  templateUrl: 'mission-detail.html',
})
export class MissionDetailPage {

  public mission: Mission;
  public detailForm: FormGroup;
  public date: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private missionProvider: MissionProvider,
    private photoViewer: PhotoViewer,
    private events: Events) {
    // this.navCtrl.setRoot()
    let id = this.navParams.get('id');
    this.mission = this.missionProvider.getMissionByid(id);
    this.detailForm = this.formBuilder.group(
      {
        desc_field: ['', Validators.required],
        loc_field: ['', Validators.required],
        isFixed_field: ['', Validators.required],
        casualties_field: [''],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionDetailPage');
  }

  saveForm(event): void {
    event.preventDefault();
    console.log("save form: " +
      this.mission.time + ' ' +
      this.detailForm.value.desc_field + ' ' +
      this.detailForm.value.loc_field + ' ' +
      this.detailForm.value.isFixed_field + ' ' +
      this.detailForm.value.casualties_field);
    this.mission.desc = this.detailForm.value.desc_field;
    this.mission.loc.lat = parseFloat(this.detailForm.value.loc_field.split(',', 2)[0]);
    this.mission.loc.lng = parseFloat(this.detailForm.value.loc_field.split(',', 2)[1]);
    this.mission.isFixed = this.detailForm.value.isFixed_field;
    this.mission.casualties = this.detailForm.value.casualties_field;
    let status = this.missionProvider.setMission(this.mission);
    this.goBack({ statu: status });
  }

  zoomImage(src: string): void {
    console.log("invoke native service")
    this.photoViewer.show(src);
  }

  goBack(param: any = null) {
    this.navCtrl.pop().then(() => {
      console.warn("piblish success_events with status: " + param.statu);
      this.events.publish('success_events', param)
    })
  }
  changeType(value: any) {
    console.log("change: " + value);
    this.mission.type = value
  }
  changeLevel(value: any) {
    console.log("change: " + value);
    this.mission.level = value
  }
}

