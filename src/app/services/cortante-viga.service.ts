import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CortanteViga } from './../models/cortante-viga';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CortanteVigaService {

  private readonly apiEndPoint = 'http://localhost:8000/cortante/';

  disenioCortante: CortanteViga = new CortanteViga();
  cehqueoCortante: CortanteViga = new CortanteViga();

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  disenioCortanteCookie(): CortanteViga {
    const cookieDisenioCortante = this.cookieService.get('disenioCortanteCookie');
    if (cookieDisenioCortante === '') {
      return new CortanteViga();
    }
    const disenioCortante = JSON.parse(cookieDisenioCortante);
    return disenioCortante;
  }

  chequeoCortanteCookie(): CortanteViga {
    const cookieChequeoCortante = this.cookieService.get('chequeoCortanteCookie');
    if (cookieChequeoCortante === '') {
      return new CortanteViga();
    }
    const chequeoCortante = JSON.parse(cookieChequeoCortante);
    return chequeoCortante;
  }

  disenioCortanteService(dataInput): Observable<CortanteViga> {
    const url = this.apiEndPoint + 'disenio/';
    console.log('Request is sent!');
    return this.http.post<CortanteViga>(url, dataInput);
  }

  chequeoCortanteService(dataInput): Observable<CortanteViga> {
    const url = this.apiEndPoint + 'chequeo/';
    console.log('Request is sent!');
    return this.http.post<CortanteViga>(url, dataInput);
  }

}
