import { ChequeoCortanteResponse } from './../models/Cortante/chequeoCortanteResponse';
import { Observable } from 'rxjs';
import { ChequeoCortanteRequest } from './../models/Cortante/chequeoCortanteRequest';
import { ServiceBaseService } from './service-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CortanteService extends ServiceBaseService {
  
  chequeoCortante(chequeoCortanteRequest: ChequeoCortanteRequest): Observable<ChequeoCortanteResponse> {
    let url = `${this.env.cortante_url}/chequeoCortante`;
    return this.http.post<ChequeoCortanteResponse>(url, chequeoCortanteRequest, { headers: this.headers });
  }

}
