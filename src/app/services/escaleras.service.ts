import { PesoPeldaniosRequest } from './../models/escaleras/pesoPeldanioRequest';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscalerasService {
  env = environment;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  calculoPesoPeldanios(pesoPeldaniosRequest: PesoPeldaniosRequest): Observable<any> {
    let url = `${this.env.herramientas_url}/pesoPeldanios`;
    return this.http.post<any>(url, pesoPeldaniosRequest,{ headers: this.headers });
  }
}
