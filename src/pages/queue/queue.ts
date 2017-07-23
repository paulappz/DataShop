import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the QueuePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html',
})
export class QueuePage {
queues :any;
   constructor(public userservice: UserProvider) {
    console.log('Hello OrdersProvider Provider');


  this.userservice.getordersbyuser().then((res: any) => {
      this.queues = res;
   console.log(this.queues);
   });
}
}