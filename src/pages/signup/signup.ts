import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController, NavParams, LoadingController, ToastController
} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    displayName: '',
    email: '',
    password: '',
    walletBal:0
  };

  constructor(public nav: NavController, public toast: ToastController, public navparams: NavParams, public loadingctrl: LoadingController, public userservice: UserProvider, public alertCtrl: AlertController) {


  }

  signup() {
    var toaster = this.toast.create({
      duration: 3000,
      position: 'button'
    });
     this.newuser.walletBal=0;
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required dude');
      toaster.present();
    }

    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong, Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingctrl.create({
        content: 'Please wait'
      });
      loader.present();
     
      this.userservice.adduser(this.newuser).then((res: any) => {
      loader.dismiss();
        if (res.success)
          this.nav.push('ProfilepicPage');
        else
          alert('Error' + res);
      })
      loader.dismiss();
    }
  }

  Login() {
    this.nav.setRoot('LoginPage');
  }

}
