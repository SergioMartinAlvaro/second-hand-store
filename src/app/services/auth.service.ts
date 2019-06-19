// Login, registration, logout and get info of user
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, first } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

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
    private env: EnvService,
    private navCtrl: NavController,
  ) { 
    this.localStorage = localStorage;
  }

  getUserProfile() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get<User>(this.env.API_URL + 'api/UserProfile', {headers: headers})
    .pipe(
      tap(user => {
        return user;
      }));
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

  register(uName: String, fName: String, lName: String, email: String, password: String, userType: string) {
    return this.http.post(this.env.API_URL + 'api/register',
      {NickName: uName, FirstName: fName, LastName: lName, Email: email, Password: password, UserType: userType})
  }

  logout() {
    this.storage.remove('token');
    this.isLoggedIn = false;
    delete this.token;
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });

    return this.http.get<User>(this.env.API_URL + 'api/UserProfile', {headers:headers})
      .pipe(
        tap(user => {
          return user;
        })
      );

  }

  editProfile(id: string, nickName: string, firstName: string, lastName: string, email: string, userType: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    const data = {NickName: nickName, FirstName: firstName, LastName: lastName, Email: email, UserType: userType};
    return this.http.put(this.env.API_URL + 'api/UserProfile/' + id, data, {headers: headers});
  }

  deleteUser(id: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.delete(this.env.API_URL + 'api/' + id, {headers: headers});
  }

  getAllUsers() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + this.localStorage["token"]
    });
    return this.http.get<User[]>(this.env.API_URL + 'api/users', {headers: headers})
    .pipe(tap(user => {
      return user;
    }
      ));
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
