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
  chequeoCortante: CortanteViga = new CortanteViga();

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  GetCortanteCookie(cookieString: string): CortanteViga {
    const cookieCortante = this.cookieService.get(cookieString);
    if (cookieCortante === '') {
      const cortanteTemp: CortanteViga = {
        bw: 30.00,
        hw: 50.00,
        r: 6.00,
        fc: 210.00,
        fy: 4220.00,
        d: 0.00,
        phiCortante: 0.75,
        phiVc: 0.00,
        phiVs: 0.00,
        phiVn: 0.00,
        Vu: 5.80,
        phiVsMax: 0.00,
        phiVnMax: 0.00,
        asCortante: 1.42,
        separacionAs: 0.00,
      };
      console.log(cortanteTemp)
      return cortanteTemp;
    }
    const cortante = JSON.parse(cookieCortante);
    return cortante;
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
