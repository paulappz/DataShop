import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserCreds} from '../../module/interface/credencials';


@Injectable()
export class SignupServiceProvider {

  constructor(public afAuth: AngularFireAuth, public afdsignup: AngularFireDatabase) {
    console.log('Hello SignupServiceProvider Provider');
  }

login(credentials: UserCreds){
   var promise = new Promise((resolve, reject) => {
this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() =>{
  resolve(true);
}).catch((err) => {
  reject(err)
})
})
return promise;
}

}
