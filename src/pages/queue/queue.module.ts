import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QueuePage } from './queue';

@NgModule({
  declarations: [
    QueuePage,
  ],
  imports: [
    IonicPageModule.forChild(QueuePage),
  ],
  exports: [
    QueuePage
  ]
})
export class QueuePageModule {}
