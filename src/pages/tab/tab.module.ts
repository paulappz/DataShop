import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabPage } from './tab';

@NgModule({
  declarations: [
    TabPage,
  ],
  imports: [
    IonicPageModule.forChild(TabPage),
  ],
  exports: [
    TabPage
  ]
})
export class TabPageModule {}
