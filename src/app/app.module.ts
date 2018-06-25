import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ElectricPage } from '../pages/electric/electric';
import { FirstaidPage } from '../pages/first-aid/firstaid';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FireFightingPage } from '../pages/fire-fighting/fire-fighting';
import { ChartProvider } from '../providers/chart/chart';
import { MissionProvider } from '../providers/mission/mission';

import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    MyApp,
    ElectricPage,
    FirstaidPage,
    HomePage,
    TabsPage,
    FireFightingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      tabsPlacement: 'top',
      tabsHideOnSubPages: true,
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ElectricPage,
    FirstaidPage,
    HomePage,
    TabsPage,
    FireFightingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ChartProvider,
    MissionProvider,
    PhotoViewer
  ]
})
export class AppModule { }
