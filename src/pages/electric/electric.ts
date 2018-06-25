import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { MissionProvider } from "../../providers/mission/mission";
import { Mission } from '../../providers/mission/mission-object';


declare var google;
declare var MarkerClusterer;

@Component({
  selector: 'page-electric',
  templateUrl: 'electric.html'
})
export class ElectricPage {

  @ViewChild('map', { read: ElementRef }) mapElement: ElementRef;
  map: any;
  type: string;
  statu: number;//1 => save success | 2 => create succes

  missionList: Mission[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private missionProvider: MissionProvider,
    private changeDetectorRef: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private events: Events) {
    this.type = navParams.get('type');
    this.type = 'electric';
    console.log("--------" + this.type);
    this.missionList = this.missionProvider.getMissionsByType(this.type);
  }

  ionViewDidLoad() {
    this.loadMap();
    console.warn('ionViewDidLoad ElectricPage');
  }


  loadMap() {
    let latLng = new google.maps.LatLng(23.16, 113.23);

    let mapOptions = {
      center: { lat: -28.024, lng: 140.887 },
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Marker',
    });
    let locations = [
      { lat: -31.563910, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.750000, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.773700, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438000 },
      { lat: -43.999792, lng: 170.463352 }
    ]
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let a = this.map;
    let markers = locations.map(function (location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });
    let markerCluster = new MarkerClusterer(this.map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
  }

  getColor(level: number) {
    if (level == 1) {
      return 'level1'
    }
    else if (level == 2) {
      return 'level2'
    }
    else if (level == 3) {
      return 'level3'
    }
    else {
      return 'blue'
    }
  }
  getStatuIcon(isFixed: boolean) {
    return isFixed ? 'md-checkbox' : 'md-square-outline'
  }

  // openDetail(mission: Mission) {
  //   this.navCtrl.push('MissionDetailPage', { mission: mission })
  // }

  openDetail() {
    this.events.subscribe('success_events', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ' + params.statu);
      this.statu = params.statu;
      this.defineToast();
      // 取消订阅
      this.events.unsubscribe('success_events');
    })
    this.navCtrl.push('MissionDetailPage');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      // location.replace(location.href);刷新整个页面
      // history.go(0);
      // this.changeDetectorRef.detectChanges();
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }

  defineToast(){
    if (this.statu == null) {
      console.error('NormalLoadPage ionViewDidEnter' + this.statu);
    }
    if (this.statu == 1) {
      this.presentToast();
    }
    if (this.statu == 2) {
      this.presentToast();
    }
  }

}
