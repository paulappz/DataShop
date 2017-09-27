import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController,
AlertController ,Loading } from 'ionic-angular';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
import { UserCreds} from '../../module/interface/credencials';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

credentials = {} as UserCreds;
loading:Loading;

constructor(public navCtrl: NavController,public authData: SignupServiceProvider,public toast: ToastController, public alertCtrl: AlertController,
public loadingCtrl: LoadingController) {
  this.credentials.email='';
  this.credentials.password='';

    }


 ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

    signin(){
 var toaster = this.toast.create({
      duration: 3000,
      position: 'button'
    });
if ((this.credentials.email != '') && (this.credentials.password != '')){

 this.authData.login(this.credentials)
 .then( authData => {
   this.navCtrl.setRoot('TabPage');
 }, error => {
   this.loading.dismiss().then( () => {
     let alert = this.alertCtrl.create({
       message: error.message,
       buttons: [
         {
           text: "Ok",
           role: 'cancel'
         }
       ]
     });
     alert.present();
   });
 });

 this.loading = this.loadingCtrl.create({
   dismissOnPageChange: true,
 });
 this.loading.present();



}
 else {
      toaster.setMessage('All fields are required dude');
      toaster.present();
return ;
 }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}
