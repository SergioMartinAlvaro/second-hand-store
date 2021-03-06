import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from './services/alert.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPagesUser = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/user-profile',
      icon: 'user'
    },
    {
      title: 'Shopping Cart',
      url: '/shopping-cart',
      icon: 'list'
    }
  ];

  user: any;
  localStorage: any;
  token: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
  ) {
    this.initializeApp();
    this.localStorage = localStorage;
    this.token = this.localStorage["token"];
  }

  ngOnInit() {
    //this.token = this.localStorage["token"];
    this.authService.getUserProfile().subscribe(data => {
      this.user = data;
    }); 
  }

  ionViewWillEnter() {
    this.token = this.localStorage["token"];
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.authService.getToken();
    });
  }
}
