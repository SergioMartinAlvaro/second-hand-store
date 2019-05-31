import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private localStorage: any;
  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService) { 
      this.localStorage = localStorage;
    }

  getCategories() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get(this.env.API_URL + 'api/Category', {headers : headers});
  }

  getCategory(id: number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get(this.env.API_URL + 'api/Category/' + id, {headers : headers});
  }

  createCategory(categoryName:string, categoryDescription:string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    const data = {CategoryName: categoryName, CategoryDescription: categoryDescription, CategoryImage: "/default.jpg"};
    return this.http.post(this.env.API_URL + 'api/Category', data, {headers : headers});
  }

  updateCategory(categoryId:number, categoryName:string, categoryDescription:string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    const data = {CategoryId: categoryId, CategoryName: categoryName, CategoryDescription: categoryDescription, CategoryImage: "/default.jpg"};
    return this.http.put(this.env.API_URL + 'api/Category/' + categoryId, data, {headers : headers});
  }
}
