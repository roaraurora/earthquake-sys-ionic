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
    this.mission = this.navParams.get('mission')
    if (this.mission == null) {
      this.mission = new Mission(
        1000,
        'electric',
        { lat: -28.024, lng: 140.887 },
        1,
        "变压器损坏",
        new Date().toISOString(),
        false,
        "/assets/imgs/view.jpg",
        "一人受伤，一人死亡", );
    }
    this.date = this.mission.time;
    this.detailForm = this.formBuilder.group(
      {
        time_field: ['', Validators.required],
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
      this.detailForm.value.time_field + ' ' +
      this.detailForm.value.desc_field + ' ' +
      this.detailForm.value.loc_field + ' ' +
      this.detailForm.value.isFixed_field + ' ' +
      this.detailForm.value.casualties_field);
    this.mission.time = this.detailForm.value.time_field;
    this.mission.desc = this.detailForm.value.desc_field;
    this.mission.loc = this.detailForm.value.loc_field;
    this.mission.isFixed = this.detailForm.value.isFixed_field;
    this.mission.casualties = this.detailForm.value.casualties_field;
    this.missionProvider.setMission(this.mission);
    this.goBack({ statu: 1 });
  }

  zoomImage(src: string): void {
    console.log("invoke native service")
    this.photoViewer.show(src);
  }

  goBack(param: any = null) {
    this.navCtrl.pop().then(() =>{
      this.events.publish('success_events',{statu:1})
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

