import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingcartServiceService } from 'src/app/services/shoppingcart-service.service';
import { AlertService } from 'src/app/services/alert.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pay-shopping-cart',
  templateUrl: './pay-shopping-cart.page.html',
  styleUrls: ['./pay-shopping-cart.page.scss'],
})
export class PayShoppingCartPage implements OnInit {

  shoppingCart: ShoppingCart;
 
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private _shoppingCartService: ShoppingcartServiceService,
    private _alertService: AlertService ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.shoppingCart = JSON.parse(params.special);
      }
    });
  }

  ngOnInit() {
  }

  pay(form: NgForm) {
    if(form.value.Owner, form.value.Number, form.value.CCV) {
      this._shoppingCartService.payShoppingCart(this.shoppingCart.shoppingCartId, this.shoppingCart.user).subscribe(
        data => {
          this._shoppingCartService.createShoppingCart(this.shoppingCart.user).subscribe(
            data => {
              this._alertService.presentToast("Shoppnig cart succesfully paid.");
              this.router.navigate(["dashboard"]);
            }
          )
        }
      )
    } else {
      this._alertService.presentToast("Please, fill all the fields to pay.");
    }

  }

}
