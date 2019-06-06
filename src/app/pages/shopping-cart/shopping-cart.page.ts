import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingcartServiceService } from '../../services/shoppingcart-service.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  userId: string;
  localStorage: any;
  shoppingCart = new ShoppingCart();
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _shoppingCartService: ShoppingcartServiceService) {
      this.localStorage = localStorage;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params["userId"];
    });
    this._shoppingCartService.getShoppingCart(this.userId).subscribe(
      data => {
        this.shoppingCart.cartStatus = data[0]["cartStatus"];
        this.shoppingCart.shoppingCartId = data[0]["shoppingCartId"];
        this.shoppingCart.user = data[0]["user"];
        this._shoppingCartService.getShoppingCartProducts(this.shoppingCart.shoppingCartId)
        .subscribe(data => {
          this.shoppingCart.Products = data;
        });
      }
    );
    }

}
