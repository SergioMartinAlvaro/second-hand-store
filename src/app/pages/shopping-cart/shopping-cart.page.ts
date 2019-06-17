import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ShoppingcartServiceService } from '../../services/shoppingcart-service.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  userId: string;
  localStorage: any;
  shoppingCart = new ShoppingCart();
  totalPrice = 0;
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _shoppingCartService: ShoppingcartServiceService,
    private _alertService: AlertService
    ) {
      this.localStorage = localStorage;
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.shoppingCart = JSON.parse(params.special);
        }
      });
  }

  ngOnInit() {
    this._shoppingCartService.getShoppingCartProducts(this.shoppingCart.shoppingCartId)
      .subscribe(data => {
        this.shoppingCart.Products = data;
        this.calculateTotalPrice();
    });
  }

    deleteTransaction(id: number) {
      console.log(id);

      this._shoppingCartService.deleteShoppingCartTransaction(id).subscribe(
        data => {
          this.shoppingCart.Products.map((x,y) => x.id == id ? this.shoppingCart.Products.splice(y,1) : '');
          this.calculateTotalPrice();
          this._alertService.presentToast("Removed product from shopping cart.");
        }
      )
    }

    navigateToPayment() {
        let data: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(this.shoppingCart)
          }
        };
        this.router.navigate(['pay-shopping-cart'], data);
    }

    calculateTotalPrice() {
      this.totalPrice = 0;
      this.shoppingCart.Products.map((x,y) => this.totalPrice += x.productPrice);
    }

}
