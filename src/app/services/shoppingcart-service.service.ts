import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';


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
  }

