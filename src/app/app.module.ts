import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import {FileChooser} from '@ionic-native/file-chooser';
import {FilePath} from '@ionic-native/file-path';
import {File} from '@ionic-native/file';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { SignupServiceProvider } from './../providers/signup-service/signup-service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { OrdersProvider } from '../providers/orders/orders';
import { Network } from '@ionic-native/network';
import { NetworkmonitorProvider } from '../providers/networkmonitor/networkmonitor';



// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDIzppokaHgDqXhwS0rT9XPN-qHrGAM3Pc",
    authDomain: "affordableng-12dff.firebaseapp.com",
    databaseURL: "https://affordableng-12dff.firebaseio.com",
    projectId: "affordableng-12dff",
    storageBucket: "",
    messagingSenderId: "888019000300"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    CommonModule,
      IonicModule.forRoot(MyApp, {tabsPlacement:'top'}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [StatusBar,SplashScreen,{provide: ErrorHandler, useClass: IonicErrorHandler},
    SignupServiceProvider,
    UserProvider,
    ImghandlerProvider, File,
    FilePath,
    FileChooser,
    OrdersProvider,
  Network,
    NetworkmonitorProvider]
})
export class AppModule {}


