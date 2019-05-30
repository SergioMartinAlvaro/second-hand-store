import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CategoryComponent } from './pages/category/category.component';
import { ProductPageModule } from './pages/product/product.module';
import { LandingPageModule } from './pages/landing/landing.module';
import { CategoryComponentModule } from './pages/category/category.module';
import { LandingPage } from './pages/landing/landing.page';
import { DashboardPageModule } from './pages/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ProductPageModule,
    CategoryComponentModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
