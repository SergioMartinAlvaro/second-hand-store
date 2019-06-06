import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from './../../services/category.service';
import { CreateProductPage } from '../product/create-product/create-product.page';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'selenium-webdriver';
import { ShoppingcartServiceService } from 'src/app/services/shoppingcart-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user = new User();
  userProfile: User;
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
    private navCtrl: NavController,
    private _shoppingCartService: ShoppingcartServiceService
  ) {
    this.menu.enable(true);
    this.localStorage = localStorage;
    this.userProfile = new User();
   }

  ngOnInit() {

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile.UserId = data["id"];
        this.userProfile.Email = data["email"];
        this.userProfile.FirstName = data["firstName"];
        this.userProfile.LastName = data["lastName"];
        this.userProfile.NickName = data["nickName"];
        this.userProfile.UserType = data["userType"];
        this._shoppingCartService.getShoppingCart(data["nickName"]).subscribe(
          sCart => {
            this.userProfile.ShoppingCart = sCart[0];
          }
        )
      }
    );

    console.log(this.userProfile);

    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
    
  }

  addToShoppingCart(productId: number) {
    var cartId = this.userProfile.ShoppingCart.shoppingCartId;
    this._shoppingCartService.addProductToShoppingCart(cartId, productId).subscribe(
      data => {
        this.alertService.presentToast("Product added succesfully to shopping cart!!");
      }
    );
  }

  ionViewWillEnter() {

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile.UserId = data["id"];
        this.userProfile.Email = data["email"];
        this.userProfile.FirstName = data["firstName"];
        this.userProfile.LastName = data["lastName"];
        this.userProfile.NickName = data["nickName"];
        this.userProfile.UserType = data["userType"];
        this._shoppingCartService.getShoppingCart(data["nickName"]).subscribe(
          sCart => {
            this.userProfile.ShoppingCart = sCart[0];
          }
        )
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

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/landing');
    this.alertService.presentToast("Logout correctly!");
  }

}
