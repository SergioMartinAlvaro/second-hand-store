//In this service put the Environment variables
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

 
  API_URL = '';

  constructor() {
    if (environment.production == true) {
      this.API_URL = 'https://smintbuster.azurewebsites.net/';
    } else {
      this.API_URL = 'http://localhost:55895/';
    }
   }
}
