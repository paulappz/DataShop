import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ShopItems} from '../../module/interface/items';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  cart: any;
  pagetotal: any;
  item = {} as ShopItems; 
  shopItem : any= 0;
  order : any;
  constructor(public navCtrl: NavController,public network:Network,public toast: ToastController, public userservice: UserProvider, public navParams: NavParams) {

this.userservice.getallshop().then((res: any) => {
      this.shopItem = res;
   });  
/*
    this.shopItem = [{ 'id': 1, 'size': '250mb', 'price': 250, 'image': '../../assets/MTN.png' },
    { 'id': 2, 'name': '500mb', 'price': 350, 'image': '../../assets/Etisalat.png' },
    { 'id': 3, 'name': '1gb', 'price': 600, 'image': '../../assets/Airtel.jpg' },
    { 'id': 4, 'name': '1.5gb', 'price': 950, 'image': '../../assets/Glo.jpg' },
    { 'id': 5, 'name': '2gb', 'price': 1200, 'image': '../../assets/MTN.png' },
    { 'id': 6, 'name': '3gb', 'price': 1750, 'image': '../../assets/Glo.jpg' },
    { 'id': 7, 'name': '4gb', 'price': 2350, 'image': '../../assets/Etisalat.png' },
    { 'id': 8, 'name': '5gb', 'price': 2950, 'image': '../../assets/Airtel.jpg' },
    { 'id': 9, 'name': '10gb', 'price':5900, 'image': '../../assets/MTN.png' },
     { 'id':10, 'name': '15gb', 'price': 8800, 'image': '../../assets/Etisalat.png' },
     { 'id': 11, 'name': '1.5gb', 'price': 950, 'image': '../../assets/Glo.jpg' },
       { 'id': 12, 'name': '5gb', 'price': 2950, 'image': '../../assets/Airtel.jpg' }
    ]
   */
   this.cart = navParams.get('param1');
     this.order = navParams.get('param2');
    this.cart = [];
     this.order = [];
  }

ionViewDidEnter() {
  this.network.onConnect().subscribe(data => {
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
 
  this.network.onDisconnect().subscribe(data => {
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
}

displayNetworkUpdate(connectionState: string){
  let networkType = this.network.type
  this.toast.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 3000
  }).present();
}

  additem(item1, price) {
    this.cart.push(this.shopItem[item1 - 1]);
    this.order.push({network :this.shopItem[item1 - 1].network, size:this.shopItem[item1-1].size, url:this.shopItem[item1-1].image_dir });
//this.cart.forEach(function(obj) { obj.number_to_credit = null; });
this.order.forEach(function(obj) { obj.number_to_credit = null; });
    return this.cart.lenght;
  }

  gotocart() {
    var total = this.gettotal(this.cart);
    this.navCtrl.push('CartPage', { param1: this.cart, param2: total, param3: this.order });
  }
  gettotal(cart) {
    var sum = 0;  // Place to store the total cost
    this.cart = cart;
    cart.forEach(function (value, index, arry) {
      value.price = parseInt(value.price);
      sum += value.price;
    });
    return sum;
  }
}