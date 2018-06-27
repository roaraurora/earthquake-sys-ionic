import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { ChartProvider } from "../../providers/chart/chart";

declare var google;
declare var echarts;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map', { read: ElementRef }) mapElement: ElementRef;
  map: any;
  @ViewChild('chartContainer1') chartElement1: ElementRef;
  @ViewChild('chartContainer2') chartElement2: ElementRef;
  @ViewChild('chartContainer3') chartElement3: ElementRef;
  chart1: any;
  chart2: any;
  chart3: any;
  pet: string = 'line';
  loader: any;

  constructor(public navCtrl: NavController,
    private chartProvider: ChartProvider,
    private loadingController: LoadingController,
    private changeDetectorRef: ChangeDetectorRef,
    private events: Events) {
    this.presentLoading();
    this.chart1 = this.chartProvider.getChart('pie');
    this.chart2 = this.chartProvider.getChart('line');
    this.chart3 = this.chartProvider.getChart('bar');
  }

  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    this.loadMap();
    this.loadChart1();
    this.loadChart2();
    this.loadChart3();
    this.setShow(this.pet);
    console.log('ionViewDidLoad HomePage');
  }
  setShow(choice: string) {
    this.chart1.isShow = choice == 'pie';
    this.chart2.isShow = choice == 'line';
    this.chart3.isShow = choice == 'bar';
    console.warn("show1: " + this.chart1.isShow,
      "show2: " + this.chart2.isShow,
      "show3: " + this.chart3.isShow, )
  }

  loadMap() {

    let latLng = new google.maps.LatLng(-33.8688, 151.2093);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Marker',
      snippet: 'Center',
    });

  }

  loadChart1() {
    this.setShow('pie');
    // 此处刷新可以简单实现为重新获取数据
    this.chart1 = this.chartProvider.getChart('pie');
    let chartContainer = this.chartElement1.nativeElement;
    this.chart1.EChart = echarts.init(chartContainer);
    this.chart1.EChart.setOption(this.chart1.option);
    // console.warn("loadChart1: " + this.chart1.EChart)
  }

  loadChart2() {
    this.setShow('line');
    let chartContainer = this.chartElement2.nativeElement;
    this.chart2.EChart = echarts.init(chartContainer);
    this.chart2.EChart.setOption(this.chart2.option);
    // console.warn("loadChart2: " + this.chart2.EChart)
  }

  loadChart3() {
    this.setShow('bar');
    let chartContainer = this.chartElement3.nativeElement;
    this.chart3.EChart = echarts.init(chartContainer);
    this.chart3.EChart.setOption(this.chart3.option);
    // console.warn("loadChart3: " + this.chart3.EChart)
  }

  ionViewDidEnter() {
    this.loader.dismiss();
  }
}
