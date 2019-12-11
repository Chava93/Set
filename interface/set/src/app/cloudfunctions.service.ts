import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudfunctionsService {

  constructor(private http: HttpClient) { }
  url = 'https://us-central1-extended-ripple-193215.cloudfunctions.net/processRequest';
  url2 = 'https://us-central1-setgame.cloudfunctions.net/hello_http';
  getSets(hand) {
    console.log(hand);
    return this.http.post(this.url2, hand);
  }
}
