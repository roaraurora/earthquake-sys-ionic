import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
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
  // statu: number;//1 => save success | 2 => create succes 已改为局部变量
  loader: any;
  missionList: Mission[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private missionProvider: MissionProvider,
    private changeDetectorRef: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private events: Events,
    private loadingController: LoadingController, ) {
    this.presentLoading();
    console.log("invoke constructor")
  }

  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    // this.loadMap();
    console.warn('ionViewDidLoad ElectricPage');
  }

  loadMap() {
    let latLng = new google.maps.LatLng(-33.8688, 151.2093);

    let mapOptions = {
      // center: { lat: -33.8688, lng: -33.8688 },
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.missionList.forEach(mission => {
      let marker = new google.maps.Marker({
        position: mission.loc,
        map: this.map,
        title: 'Marker',
        icon: this.getMarker(mission.level),
      });
    })
  }

  getMarker(level: number) {
    if (level == 1) {
      return '/assets/imgs/level1.png'
    }
    else if (level == 2) {
      return '/assets/imgs/level2.png'
    }
    else if (level == 3) {
      return '/assets/imgs/level3.png'
    }
    else {
      return '/assets/imgs/levelD.png'
    }
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
      return 'level_default'
    }
  }

  getIcon() {
    if (this.type == "electric") {
      return 'md-flash'
    }
    else if (this.type == "firstaid") {
      return 'md-medkit'
    }
    else if (this.type == "firefighting") {
      return 'md-flame'
    }
    else {
      return 'level_default'
    }
  }

  getStatuIcon(isFixed: boolean) {
    return isFixed ? 'md-checkbox' : 'md-square-outline'
  }

  openDetail(id: number) {
    this.events.unsubscribe('success_events');//再次进入detail页面都要取消订阅 否则会开启多个观察者
    console.log('start subscribe');
    this.events.subscribe('success_events', (params) => {
      // 接收misso页面发布的数据
      console.log('接收数据为: ' + params.statu);
      let statu = params.statu;
      // show toast
      this.defineToast(statu);
      // 取消订阅
      this.events.unsubscribe('success_events');
    })
    this.navCtrl.push('MissionDetailPage', { id: id });
  }

  defineToast(statu: number) {
    if (statu == null) {
      console.error('call toast but no status: ' + statu);
    }
    if (statu == 1) {
      this.presentToast("modify mission success");
    }
    if (statu == 2) {
      this.presentToast("add new mission success");
    }
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: "color:blue"
    });
    this.reload();
    toast.present();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      // location.replace(location.href);刷新整个页面
      // history.go(0);
      this.reload();
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  ionViewDidEnter() {
    this.reload(); //每次进来更新数据
    console.error("did enter");
    this.loader.dismiss();
  }

  reload() {
    // 获取mission列表
    this.type = this.navParams.get('type');
    this.missionList = this.missionProvider.getMissionsByType(this.type);
    // map
    this.loadMap();
    console.log("get missions by type" + this.type + " - total: " + this.missionList.length);

    // 检测dom有没有改变
    this.changeDetectorRef.detectChanges();
  }

  ionViewWillUnload() {
    // 当界面被销毁的时候，这儿可以执行取消订阅等操作
    this.events.unsubscribe('success_events');
    console.error('NormalLoadPage ionViewWillUnload');
  }
}
