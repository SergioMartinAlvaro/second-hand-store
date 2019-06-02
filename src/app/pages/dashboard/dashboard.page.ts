import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from './../../services/category.service';
import { CreateProductPage } from '../product/create-product/create-product.page';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  userProfile: any;
  categories: any;
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }
  private localStorage: any;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private _categoryService: CategoryService,
    private modalController: ModalController,
    private alertService: AlertService,
    private navCtrl: NavController
  ) {
    this.menu.enable(true);
    this.localStorage = localStorage;
    this.userProfile = null;
   }

  ngOnInit() {

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
        console.log(this.userProfile);
      }
    )

    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );

    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
    
  }

  async createProducts() {
    const createModal = await this.modalController.create({
      component: CreateProductPage
    });
    return await createModal.present();
  }

  ionViewWillEnter() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    )

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
        console.log(this.userProfile);
      }
    )
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/landing');
    this.alertService.presentToast("Logout correctly!");
  }

}
