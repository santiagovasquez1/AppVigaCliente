import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {
  env = environment;
  public headers: HttpHeaders;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
}
