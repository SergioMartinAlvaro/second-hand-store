import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';

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

  createProduct(name:string, description:string, price:number, categoryId:any) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    var data = {ProductName: name, ProductDescription: description, ProductImage: "default.jpg", UserId: 1, ProductPrice: price, CategoryId: categoryId};
    console.log(data);
    return this.http.post(this.env.API_URL + 'api/ProductModels', data, {headers : headers});
  }
}
