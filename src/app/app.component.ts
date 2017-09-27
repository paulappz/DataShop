import { Component , ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
//rootPage:any = TabsPage;
rootPage:any;
activePage : any;

pages: Array<{title: string, component:any}>;

  constructor(platform: Platform,  afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {


const authObserver = afAuth.authState.subscribe( user => {
  if (user) {
    this.rootPage = 'TabPage';
    authObserver.unsubscribe();
  } else {
    this.rootPage = 'LoginPage';
    authObserver.unsubscribe();
  }
});

platform.ready().then(() => {
  splashScreen.hide();
})

/* platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }); */

/* this.pages =  [
  { title: 'Firebase Home', component: 'ShopPage'},
   { title: ' Home', component: 'HomePage'},
     { title: ' queue', component: 'QueuePage'}
];
this.activePage = this.pages[0]; */
}


/*initializeApp(){


  }*/
openPage(page){
  this.nav.setRoot(page.component);
  this.activePage= page;
}
checkActive(page){
  return page == this.activePage;
}
}
