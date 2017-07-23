import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
 avatar: string;
 amount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController) {
      
  }


  ionViewWillEnter() {
    this.loaduserdetails();
  }
 
  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.amount = res.walletBal;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }
}
