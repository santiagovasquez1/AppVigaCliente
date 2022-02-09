import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { chequeoFlexionResponse } from '../models/Flexion/chequeoFlexionResponse';
import { chequeoFlexionRequest } from './../models/Flexion/chequeoFlexionRequest';

@Injectable({
  providedIn: 'root'
})
export class FlexionService {
  env = environment;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  chequeoFlexion(chequeoFlexionRequest: chequeoFlexionRequest): Observable<chequeoFlexionResponse> {
    let url = `${this.env.flexion_url}/chequeoFlexion`;
    return this.http.post<chequeoFlexionResponse>(url, chequeoFlexionRequest, { headers: this.headers });
  }
}
