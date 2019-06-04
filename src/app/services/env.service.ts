//In this service put the Environment variables
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://localhost:55895/';
 //API_URL = 'http://10.34.112.58:55895/';

  constructor() { }
}
