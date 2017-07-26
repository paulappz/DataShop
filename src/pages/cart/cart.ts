import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PhoneNumber } from '../../module/interface/phonenumber';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  carts: any;
  total: any;
  sum: any = 0;
  orders: any;
  walletBalance: any;
  phone_nos = {} as PhoneNumber;
  constructor(public navCtrl: NavController, public zone: NgZone, public toast: ToastController,
    public alertCtrl: AlertController, public userservice: UserProvider, public navParams: NavParams) {
    this.carts = navParams.get('param1');
    this.total = navParams.get('param2');
    this.orders = navParams.get('param3');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.walletBalance = res.walletBal;
    })
  }



  removeitem(item, price) {
    var index = this.carts[item - 1];
    var phoneindex = this.orders[item - 1];
    this.carts.splice(index, 1);
    this.orders.splice(phoneindex, 1);
    this.total = this.total - price;
  }

  checkTotal() {
    var toaster = this.toast.create({
      duration: 3000,
      position: 'button'
    });
    if (this.walletBalance < this.total) {
      toaster.setMessage('Insuffient Wallet Balance');
      toaster.present();
    }

    else {
      this.makePayment();
    }
  }

  checkPhoneNo() {
    var check = true;
    this.orders.forEach(function (obj) {
      if (obj.number_to_credit == null) {
        check = false;
      }
    })
    return check;
  }


  checkOut() {
    var toaster = this.toast.create({
      duration: 3000,
      position: 'button'
    });

    if (!this.checkPhoneNo()) {
      toaster.setMessage('Input all phone number slots dude');
      toaster.present();
    }
    else {
      this.checkTotal();
    }

  }

  gotoQueue() {
    this.navCtrl.push('QueuePage');
  }

  gotoWallet() {
    this.navCtrl.push('WalletPage');
  }

  makePayment() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });

    let alert = this.alertCtrl.create({

      title: 'Confirm purchase',
      message: this.total + ' Naira will be deducted from your Wallet',

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Proceed',
        handler: data => {
          if (this.walletBalance) {
            this.walletBalance = this.walletBalance - this.total;
            this.userservice.updateWallet(this.walletBalance).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Done');
                statusalert.setSubTitle('Transaction successful');
                statusalert.present();
                this.zone.run(() => {
                  this.walletBalance = this.walletBalance;
                 
                  this.userservice.addorder(this.orders);
                  
                })
                    this.gotoWallet();
              }

              else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
              }

            })
          }
        }

      }]
    });

    alert.present();
  }

}




