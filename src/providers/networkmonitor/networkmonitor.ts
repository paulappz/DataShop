import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
/*
  Generated class for the NetworkmonitorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkmonitorProvider {

  constructor(public http: Http,public network: Network ) {
    console.log('Hello NetworkmonitorProvider Provider');
  }

}
