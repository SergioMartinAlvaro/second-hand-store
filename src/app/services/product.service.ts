import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private localStorage: any;

  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService) {
      this.localStorage = localStorage;
    }

  createProduct(userId: any, name:string, description:string, price:number, categoryId:any) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    var data = {ProductName: name, ProductDescription: description, ProductImage: "default.jpg", UserId: userId, ProductPrice: price, CategoryId: categoryId};
    return this.http.post(this.env.API_URL + 'api/ProductModels', data, {headers : headers});
  }

  getProductsByUserId(userId: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get<Product[]>(this.env.API_URL + 'api/ProductModels?userId=' + userId , {headers : headers})
    .pipe(
      tap(product => {
        return product;
      }));
  }

  getProduct(id:number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get(this.env.API_URL + 'api/ProductModels?id=' + id , {headers : headers});
  }
}
