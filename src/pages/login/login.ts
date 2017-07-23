import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,
AlertController  } from 'ionic-angular';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
import { UserCreds} from '../../module/interface/credencials';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

credentials = {} as UserCreds

constructor(public navCtrl: NavController,public authData: SignupServiceProvider, public alertCtrl: AlertController,
public loadingCtrl: LoadingController) {

    }

  
 ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

    signin(){
 this.authData.login(this.credentials).then((res: any) =>{
   if (!res.code)
   this.navCtrl.setRoot('TabPage');
   else
   alert(res);
 })
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}
