import { CalcAxResponse } from './../models/elementosNoEstructurales/calcAxResponse';
import { CalcAxRequest } from './../models/elementosNoEstructurales/calcAxRequest';
import { ServiceBaseService } from './service-base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TipoAnclaje } from '../models/elementosNoEstructurales/tipoAnclaje';
import { Observable } from 'rxjs';
import { AmplificacionDinamica } from '../models/elementosNoEstructurales/amplificacionDinamica';
import { CalcFpRequest } from '../models/elementosNoEstructurales/calcFpRequest';
import { CalcFpResponse } from '../models/elementosNoEstructurales/calcFpResponse';

@Injectable({
  providedIn: 'root'
})
export class ElementosNoEstructuralesService extends ServiceBaseService {

  getTiposAnclajes(): Observable<TipoAnclaje[]> {
    let url = `${this.env.elementosNoEstructurales_url}/tiposAnclajes`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.tiposAnclajes as TipoAnclaje[];
        })
      );
  }

  getAmplificacionesDinamicas(): Observable<AmplificacionDinamica[]> {
    let url = `${this.env.elementosNoEstructurales_url}/amplificacionesDinamicas`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.amplificacionesDinamicas as AmplificacionDinamica[];
        })
      );
  }

  calcAceleracionDinamica(calcAxRequest: CalcAxRequest): Observable<CalcAxResponse> {
    let url = `${this.env.elementosNoEstructurales_url}/calculoAx`;
    return this.http.post<any>(url,calcAxRequest, { headers: this.headers})
      .pipe(
        map(res => {
          return res as CalcAxResponse;
        })
      );
  }

  calcfuerzaSismica(calcFpRequest: CalcFpRequest): Observable<CalcFpResponse> {
    let url = `${this.env.elementosNoEstructurales_url}/calculoFuerzaSismica`;
    return this.http.post<any>(url,calcFpRequest, { headers: this.headers})
      .pipe(
        map(res => {
          return res as CalcFpResponse;
        })
      );
  }
}
