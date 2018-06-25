import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FireFightingPage } from './fire-fighting';

@NgModule({
  declarations: [
    FireFightingPage,
  ],
  imports: [
    IonicPageModule.forChild(FireFightingPage),
  ],
})
export class FireFightingPageModule {}
