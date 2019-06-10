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

  updateProduct(productId: number, UserId: string, productName: string, productDescription: string,
     productPrice: number, categoryId: number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    const data = {ProductName: productName, ProductDescription: productDescription, ProductPrice: productPrice,
      UserId: UserId, CategoryId: categoryId, ProductImage: "default.jpg", ProductId: productId};
    return this.http.put<Product>(this.env.API_URL + 'api/ProductModels/' + productId , data, {headers : headers})
    .pipe(
      tap(product => {
        return product;
      }));
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.delete(this.env.API_URL + 'api/ProductModels/' + id , {headers : headers});
  }

  getProduct(id:number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get<Product>(this.env.API_URL + 'api/ProductModels?id=' + id , {headers : headers})
    .pipe(
      tap(product => {
        return product;
      }));;
  }
}
