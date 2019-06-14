import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from './../../services/category.service';
import { CreateProductPage } from '../product/create-product/create-product.page';
import { AlertService } from 'src/app/services/alert.service';
import { ShoppingcartServiceService } from 'src/app/services/shoppingcart-service.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private _categoryService: CategoryService,
    private modalController: ModalController,
    private alertService: AlertService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private _shoppingCartService: ShoppingcartServiceService
  ) {
    this.menu.enable(true);
    this.userProfile = new User();
   }

  ngOnInit() {

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
        this._shoppingCartService.getShoppingCart(data.nickName).subscribe(
          sCart => {
            this.userProfile.shoppingCart = sCart[0];
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
    var cartId = this.userProfile.shoppingCart.shoppingCartId;
    this._shoppingCartService.addProductToShoppingCart(cartId, productId).subscribe(
      () => {
        this.alertService.presentToast("Product added succesfully to shopping cart!!");
      }
    );
  }

  ionViewWillEnter() {

    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
        this._shoppingCartService.getShoppingCart(data.nickName).subscribe(
          sCart => {
            this.userProfile.shoppingCart = sCart[0];
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

  navigateToShoppingCart() {
    let data: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.userProfile.shoppingCart)
      }
    };
    this.router.navigate(['shopping-cart'], data);
  }

  navigateToEditUser() {
    let data: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.userProfile)
      }
    };
    this.router.navigate(['user-profile'], data);
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
