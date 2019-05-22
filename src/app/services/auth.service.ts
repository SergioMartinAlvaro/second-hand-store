// Login, registration, logout and get info of user
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;
  private localStorage: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService
  ) { 
    this.localStorage = localStorage;
  }

  getUserProfile() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token["token"]
    });
    return this.http.get(this.env.API_URL + 'api/UserProfile', {headers: headers}
    );
  }

  login(email: String, password: String) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    var data = {NickName: email, Password: password};
    return this.http.post(this.env.API_URL + 'api/login', 
    data, {headers: headers}
    ).pipe(
      tap(token => {
        this.localStorage.setItem("token", token["token"]);
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(uName: String, fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'api/register',
      {NickName: uName, FirstName: fName, LastName: lName, Email: email, Password: password})
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token['token_type'] + '' + this.token['access_token']
    });

    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers})
      .pipe(
        tap(data => {
          this.storage.remove('token');
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token["token"]
    });

    return this.http.get<User>(this.env.API_URL + 'api/UserProfile', {headers:headers})
      .pipe(
        tap(user => {
          return user;
        })
      );

  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    )
  }
}
