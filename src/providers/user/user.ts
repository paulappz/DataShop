import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserProvider {


  firedata = firebase.database().ref('/shopusers');
  fireshop = firebase.database().ref('/datashop');
  fireorders = firebase.database().ref('/dataorders');
  constructor(public afriauth: AngularFireAuth, public afddb: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }



  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afriauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then(() => {
          this.afriauth.auth.currentUser.updateProfile({
            displayName: newuser.displayName,
            photoURL: '../../assets/Ayo.png',
           walletBal : newuser.walletBal
        }).then(() => {
            this.firedata.child(this.afriauth.auth.currentUser.uid).set({
              uid: this.afriauth.auth.currentUser.uid,
              displayName: newuser.displayName,
              photoURL: '../../assets/Ayo.png',
              walletBal: newuser.walletBal
           }).then(() => {
              resolve({ success: true });
            }).catch((err) => {
              reject(err);
            })
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

addorder(neworder){
  var id = this.afriauth.auth.currentUser.uid;
  console.log(id);
  neworder.forEach(function(obj) { obj.uid = id , obj.date = new Date().toLocaleString(); });
 this.fireorders.push(neworder);
}

passwordReset(email){
var promise = new Promise((resolve, reject)=>{
firebase.auth().sendPasswordResetEmail(email).then(()=>{
resolve({ success:true});
}).catch((err) =>{
  reject(err);
})
})
return promise;
}


updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afriauth.auth.currentUser.updateProfile({
              displayName: this.afriauth.auth.currentUser.displayName,
              photoURL: imageurl,
              walletBal: this.afriauth.auth.currentUser.walletBal 
          }).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: this.afriauth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid,
              walletBal: this.afriauth.auth.currentUser.walletBal 
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
  }


  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
  

updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afriauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afriauth.auth.currentUser.photoURL,
      walletBal: this.afriauth.auth.currentUser.walletBal 
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afriauth.auth.currentUser.photoURL,
        uid: this.afriauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

updateWallet(newbal){
    var promise = new Promise((resolve, reject) => {
      this.afriauth.auth.currentUser.updateProfile({
      displayName: this.afriauth.auth.currentUser.displayName,
      photoURL: this.afriauth.auth.currentUser.photoURL,
      walletBal : newbal
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: this.afriauth.auth.currentUser.displayName,
        photoURL: this.afriauth.auth.currentUser.photoURL,
        uid: this.afriauth.auth.currentUser.uid,
        walletBal : newbal
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
}

  /*removeItem(id){
    this.fireshop.remove(id);
  }
*/

addItem(shopdata){
    this.fireshop.push(shopdata);
  }


getallshop(){
    var promise = new Promise((resolve, reject) => {
this.fireshop.orderByChild('uid').once('value', (snapshot) => {
        let items = [];
        snapshot.forEach((snap) => {
            items.push({
               // key: snap.key,
                id: snap.val().id,
                network: snap.val().network,
                price:snap.val().price,
                size:snap.val().size,
                image_dir: snap.val().image_dir
            });
            return false;
        });
        resolve(items);
        }).catch((err) => {
        reject(err);
      })
    })
    return promise;
}

getordersbyuser(){
  var id = this.afriauth.auth.currentUser.uid;
    var promise = new Promise((resolve, reject) => {
this.fireorders.once('value', (snapshot) => {
        let items = [];
      snapshot.forEach((data) => {
        let orders = data.val();
         for(let i=0; i < orders.length; i++){
           if (id == orders[i].uid) {
          items.push(orders[i]);
           }
        }
        return false;
      })
  
        //   snapshot.forEach((snap) => {    
        //         items.push({
        //       // key: snap.key,
        //         network: snap.val().network,
        //         number:snap.val().number_to_credit,
        //         size:snap.val().size
        //     });
        //     return false;
        // }); 
 
        resolve(items);
        }).catch((err) => {
        reject(err);
      })
    })
    return promise;
}

  getShoppingItems(){
    return this.afddb.list('shoppingItems/');
  }
}