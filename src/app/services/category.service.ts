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
}