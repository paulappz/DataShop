import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

imagesArray: any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
   this.imagesArray = [
    {'image':'../../assets/slider/bg.jpg'},
    {'image':'../../assets/slider/bg1.jpg'},
    {'image':'../../assets/slider/bg2.jpg'},
    {'image':'../../assets/slider/bg3.jpg'},
    {'image':'../../assets/slider/bg8.jpeg'},
    {'image':'../../assets/slider/bg5.jpeg'},
    {'image':'../../assets/slider/bg6.jpeg'},
    {'image':'../../assets/slider/bg7.jpeg'}
    ];

  
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }


}
