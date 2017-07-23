import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
email : string;
constructor(public userservice: UserProvider,
  public nav: NavController, public alertCtrl: AlertController) {

}

resetPassword(){
  let alert = this.alertCtrl.create({
    buttons:['Ok']
  });
    this.userservice.passwordReset(this.email).then((res : any) =>{
if(res.success){
  alert.setTitle("Email sent");
   alert.setSubTitle("Please follow the information in the email to reset your password");
}
else{
  alert.setTitle("Failed");
}
    });
  }

goBack(){
  this.nav.setRoot('LoginPage');
}

}