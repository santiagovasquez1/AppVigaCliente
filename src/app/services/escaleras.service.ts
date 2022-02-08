import { MomentoUltimoResponse } from './../models/escaleras/momentoUltimoResponse';
import { CargaUltimaResponse } from './../models/escaleras/cargaUltimaResponse';
import { CargaUltimaRequest } from './../models/escaleras/cargaUltimaRequest';
import { CargaMuertaRequest } from './../models/escaleras/cargaMuertaRequest';
import { PesoPeldaniosRequest } from './../models/escaleras/pesoPeldanioRequest';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargaMuertaResponse } from '../models/escaleras/CargaMuertaResponse';
import { MomentoUltimoRequest } from '../models/escaleras/momentoUltimoRequest';

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
    return this.http.post<any>(url, pesoPeldaniosRequest, { headers: this.headers });
  }

  calculoCargaMuerta(cargaMuertaRequest: CargaMuertaRequest): Observable<CargaMuertaResponse> {
    let url = `${this.env.herramientas_url}/cargaMuerta`;
    return this.http.post<CargaMuertaResponse>(url, cargaMuertaRequest, { headers: this.headers });
  }

  calculoCargaUltima(cargaUltimaRequest: CargaUltimaRequest): Observable<CargaUltimaResponse> {
    let url = `${this.env.herramientas_url}/cargaUltima`;
    return this.http.post<CargaUltimaResponse>(url, cargaUltimaRequest, { headers: this.headers });
  }

  calculoMomentoUltimo(momentoUltimoRequest: MomentoUltimoRequest): Observable<MomentoUltimoResponse> {
    let url = `${this.env.herramientas_url}/momentoUltimo`;
    return this.http.post<MomentoUltimoResponse>(url, momentoUltimoRequest, { headers: this.headers });
  }
}
