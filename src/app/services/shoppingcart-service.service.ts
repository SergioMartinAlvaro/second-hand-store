import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShoppingCart } from '../models/shopping-cart';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingcartServiceService {

  private localStorage: any;

  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService) {
      this.localStorage = localStorage;
    }

    createShoppingCart(user: any) {
      const headers = new HttpHeaders({
  //      'Authorization': "Bearer " + this.localStorage["token"]
      });
      var data = {CartStatus: true, User: user};
      console.log(data);
      return this.http.post(this.env.API_URL + 'api/ShoppingCartModels', data, {headers : headers});
    }

    getShoppingCart(user: any) {
      const headers = new HttpHeaders({
              'Authorization': "Bearer " + this.localStorage["token"]
      });
      return this.http.get<ShoppingCart>(this.env.API_URL + 'api/ShoppingCartModels?user=' + user , {headers : headers})
      .pipe(
        tap(shoppingCart => {
          return shoppingCart;
        })
      );
    }

    addProductToShoppingCart(cartId: number, productId: number) {
      const headers = new HttpHeaders({
        'Authorization': "Bearer " + this.localStorage["token"]
      });
      const data = {ProductId: productId, ShoppingCartId: cartId };
      return this.http.post(this.env.API_URL + 'api/ShoppingCartTransactionsModels' , data, {headers : headers});
    }

    getShoppingCartProducts(id: number) {
      const headers = new HttpHeaders({
        'Authorization': "Bearer " + this.localStorage["token"]
      });
      return this.http.get(this.env.API_URL + 'api/ShoppingCartTransactionsModels/' + id , {headers : headers});
    }
  }

