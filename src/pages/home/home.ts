import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, NavController, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ShopItems} from '../../module/interface/items';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingItems: FirebaseListObservable<any[]>;

  item = {} as ShopItems; 
  objects :any;
   shopItem : any;
  constructor(public navCtrl: NavController, public userservice: UserProvider, public app: App) {
  this.userservice.getallshop().then((res: any) => {
      this.shopItem = res;
      console.log(this.shopItem);
   });

/*
    this.shoppingItems = this.userservice.getShoppingItems();
*/
  }

  addItem() {
if (this.item.network == "Mtn"){
  this.item.image_dir = '../../assets/MTN.png';
}
else if (this.item.network == "Etisalat"){
    this.item.image_dir = '../../assets/Etisalat.png';
}

else if (this.item.network == "Airtel"){
    this.item.image_dir = '../../assets/Airtel.jpg';
}
else{
  this.item.image_dir = '../../assets/Glo.jpg';
}
   console.log(this.item);
   this.userservice.addItem(this.item);
    

  }
  /*
    removeItem(id){
      this.firebaseServiceProvider.removeItem(id);
    }
  */

}
